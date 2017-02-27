//二叉树结点的数据结构
function BinTree(left, right, value) {
    this.left = left;
    this.right = right;
    this.value = value;
}

//返回一棵高度为level的完全二叉树
function genBinTree(level){
    var node = new BinTree(null, null, level);
    if(level > 0){
        node.left = genBinTree(level-1);
        node.right = genBinTree(level-1);
    }
return node;
}

//初始化一个二叉树
function initTree(level){
    var root = genBinTree(level);
    var rootView = document.getElementById('root');
    rootView.innerHTML = '';
    renderBinTree(root, rootView);
    
    //记录动画的setInterval ID，取消动画的时候清除对应的setInterval
    var preAnimate;
    //当树渲染完成后再绑定遍历按钮的事件。
    document.getElementById('preorderTraversal')
            .addEventListener('click', function () {
                cleanAnimation(preAnimate);
                preAnimate = animateTraverse(preorderTraversal(root));
            });

    document.getElementById('inorderTraversal')
            .addEventListener('click', function () {
                cleanAnimation(preAnimate);
                preAnimate = animateTraverse(inorderTraversal(root));
            });
    document.getElementById('postorderTraversal')
            .addEventListener('click', function () {
                cleanAnimation(preAnimate);
                preAnimate = animateTraverse(postorderTraversal(root));
            });
}

//清除动画
function cleanAnimation(preAnimate) {
    clearInterval(preAnimate);
    var focus = document.getElementById('focus');
    if(focus != null){
        focus.id = '';
    }
}

//将二叉树渲染到网页
function renderBinTree(root, parentElement) {
    if(root != null){
        var treeView = document.createElement('div');
        treeView.className='child';
        root.value = treeView;
        parentElement.appendChild(treeView);
        renderBinTree(root.left, treeView);
        renderBinTree(root.right, treeView);
    }
}

//生成二叉树先序遍历序列
function preorderTraversal(root){
    var traverseQueue = [];
    function genTraverseQueue(root) {
        if(root != null){
            //root.value.classList.add('focus');
            traverseQueue.push(root);
            genTraverseQueue(root.left);
            genTraverseQueue(root.right);
        }
    }
    genTraverseQueue(root);
    return traverseQueue;
}
//中序遍历
function inorderTraversal(root){
    var traverseQueue = [];
    function genTraverseQueue(root) {
        if(root != null){
            genTraverseQueue(root.left);
            traverseQueue.push(root);
            genTraverseQueue(root.right);
        }
    }
    genTraverseQueue(root);
    return traverseQueue;
}

//后序遍历
function postorderTraversal(root){
    var traverseQueue = [];
    function genTraverseQueue(root) {
        if(root != null){
            genTraverseQueue(root.left);
            genTraverseQueue(root.right);
            traverseQueue.push(root);
        }
    }
    genTraverseQueue(root);
    return traverseQueue;
}

//动画显示二叉树遍历序列
function animateTraverse(traverseQueue){
    var start = 0;
    var time;
    var end = traverseQueue.length;
    var preNode = null;

    time = setInterval(function () {
        if(preNode != null){
            preNode.id = '';
            //preNode.classList.remove('focus');
        }
        if(start < end){
            //traverseQueue[start].value.classList.add('focus');
            traverseQueue[start].value.id='focus';
            preNode =traverseQueue[start].value;
            start++;
        }else{
            clearInterval(time);
            console.log('animate done');
        }
    }, 500);
    return time;
}

function init() {
    initTree(3);
}

init();
