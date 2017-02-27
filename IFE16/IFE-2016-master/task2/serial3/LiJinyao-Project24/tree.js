//生成树遍历序列算法
var traversal = {
    preorderTraversal: function preorderTraversal(root){
        var traverseQueue = [];
        function genTraverseQueue(root) {
            var key;
            traverseQueue.push(root.view);
            for(key in root){

                if(key != 'view'){
                    if(root.hasOwnProperty(key)){

                        genTraverseQueue(root[key]);
                    }
                }

            }
        }
        genTraverseQueue(root);
        //data第一次访问view的时候为undefined。删除第一个元素
        traverseQueue.shift();
        return traverseQueue;
    },

    postorderTraversal: function postorderTraversal(root){
        var traverseQueue = [];
        function genTraverseQueue(root) {
            var key;
            for(key in root){
                if(key != 'view'){
                    if(root.hasOwnProperty(key)){
                        genTraverseQueue(root[key]);
                    }
                }
            }
            traverseQueue.push(root.view);
        }
        genTraverseQueue(root);
        //data第一次访问view的时候为undefined。删除最后一个元素
        traverseQueue.pop();
        return traverseQueue;
    }
};

//初始化一棵树并绑定事件
function initTree(data){

    var rootView = document.getElementById('root');
    rootView.innerHTML = '';
    renderTree(data,rootView);
    var preAnimate;
    var animator = new TreeAnimator();
    //当树渲染完成后再绑定遍历按钮的事件。
    addClickEvent($('preorderTraversal'), function () {
        animator.animateTraverse(traversal.preorderTraversal(data), false);
        // cleanAnimation(preAnimate);
        // preAnimate = animateTraverse(traversal.preorderTraversal(data));
    });

    addClickEvent($('postorderTraversal'), function () {
        animator.animateTraverse(traversal.postorderTraversal(data), false);
    });

    addClickEvent($('preordersearchBtn'), function () {
        // cleanAnimation(preAnimate);
        // preAnimate = searchTree(traversal.preorderTraversal, data);
        var searchResult = searchTree(traversal.preorderTraversal, data);
        animator.animateTraverse(searchResult.result, searchResult.isFindTarget, function () {
            if(searchResult.isFindTarget){
                $('searchResult').innerHTML = '找到 '+ searchResult.searchTarget;
            }else{
                $('searchResult').innerHTML = '没有找到 ' + searchResult.searchTarget;
            }
        });
    });

    addClickEvent($('postordersearchBtn'), function () {
        // cleanAnimation(preAnimate);
        // preAnimate = searchTree(traversal.postorderTraversal, data);
        $('searchResult').innerHTML = '';
        var searchResult = searchTree(traversal.postorderTraversal, data);
        animator.animateTraverse(searchResult.result, searchResult.isFindTarget, function () {
            if(searchResult.isFindTarget){
                $('searchResult').innerHTML = '找到 '+ searchResult.searchTarget;
            }else{
                $('searchResult').innerHTML = '没有找到 ' + searchResult.searchTarget;
            }
        });
    });

    addClickEvent($('deleteNode'), function () {
        var target = $('selected');
        if(target){
            //从view中删除
            target.parentNode.removeChild(target);
            var targetData = target.getAttribute('data');
            //从数据库删除（好吧就是一个json）
            modifyData(data, targetData, null);
            rootView.innerHTML = '';
            renderTree(data,rootView);
        }
    });

    addClickEvent($('addNode'), function () {
        var target = $('selected');
        var text = $('addNodeText').value;
        var targetData = target.getAttribute('data');
        modifyData(data, targetData, text);
        rootView.innerHTML = '';
        renderTree(data,rootView);

    });
}

//target:想要修改的值的名称，value:给目标修改的新值。
function modifyData(data, target, value){
    for(key in data){
        if(data.hasOwnProperty(key)){
            if(key == target){
                if(value){
                    data[key][value] = {};
                }else{
                    delete data[key];
                }
                break;
            }else{
                modifyData(data[key], target, value);
            }
        }
    }
}
//搜索内容，生成搜索队列
function searchTree(queryMethod,data, target) {
    var searchTarget;
    if(!target){
        searchTarget = $('searchText').value;
    }

    var queue = queryMethod(data);
    var len = queue.length;
    var start=0, end=0;

    var findTarget = false;
    for(var i = 0; i < len; i++){
        end = i;
        if(queue[i].getAttribute('data') == searchTarget){
            findTarget = true;
            console.log('find search!');
            break;
        }
    }
    return {result: queue.slice(start, end +1),
        isFindTarget: findTarget,
        searchTarget: searchTarget,
        target: queue[end]};
}

var $ = function (element) {
    return document.getElementById(element);
};

function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener);
    }else{
        element['on' + event] = listener;
    }
}

function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}


//将json树渲染到网页
function renderTree(data, parentElement){
    // var data = {
    //     'root': {
    //         'a': {
    //             'a1': 'a1',
    //             'a2': 'a2'
    //         },
    //         'b': {
    //             'b1': {
    //                 'b1.1': 'b1.1',
    //                 'b1.2': 'b1.2',
    //                 'b1.3': 'b1.3'
    //             },
    //             'b2': {
    //                 'b2.1': 'b2.1'
    //             }
    //         }
    //     }
    // };
    var key;
    var treeView;
    for(key in data){
        if(data.hasOwnProperty(key)){
            if(key != 'view'){
                treeView = document.createElement('div');
                treeView.className='child';
                treeView.innerHTML = key;
                parentElement.appendChild(treeView);


                data[key].view = treeView;
                data[key].view.setAttribute('data', key.toString());
                //监听点击事件
                addClickEvent(treeView,function (event) {
                    var preTarget = document.getElementById('selected');
                    if(preTarget){
                        preTarget.id = '';
                    }
                    event.target.id = 'selected';


                });
                renderTree(data[key], treeView);
            }
        }
    }
}

//封装动画对象
var TreeAnimator = function () {
    var preAnimate;
    var animatingElement;

    function cleanAnimation() {
        clearInterval(preAnimate);
        if(animatingElement){
            animatingElement.id = '';
        }
        var selectedElement = document.getElementById('selected');
        if(selectedElement){
            selectedElement.id = '';
        }
    }

    this.animateTraverse = function (traverseQueue, highlightLast, callBack){
        cleanAnimation();
        var start = 0;
        var end = traverseQueue.length;
        var preNode = null;

        preAnimate = setInterval(function () {
            if(preNode != null){
                preNode.id = '';
                //preNode.classList.remove('focus');
            }
            if(start < end){
                //traverseQueue[start].view.classList.add('focus');
                traverseQueue[start].id='focus';
                animatingElement = traverseQueue[start];
                preNode =traverseQueue[start];
                start++;
            }else{
                clearInterval(preAnimate);
                if(highlightLast){
                    traverseQueue[end-1].id='highlight';
                    animatingElement = traverseQueue[end-1];
                }
                console.log('animate done');
                callBack();
            }
        }, 500);
    };
};

function init() {
    var data = {
        'root': {
            'a': {
                'a1': {},
                'a2': {}
            },
            'b': {
                'b1': {
                    'b1.1': {},
                    'b1.2': {},
                    'b1.3': {
                        'b1.3.1': {}
                    }
                },
                'b2': {
                    'b2.1': {}
                }
            }
        }
    };

    initTree(data);
}

init();
