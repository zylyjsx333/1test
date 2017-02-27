var traverse = []; //存放遍历结果
var search = []; //存放搜索结果
var timer;

//遍历树
function preOrder(tree) {
    if (tree !== null) {
        traverse.push(tree);
        for (var i = 0; i < tree.children.length; i++) {
            preOrder(tree.children[i]);
        }
    }
}
//搜索树
var tag = true; //标记是否搜索到，搜索到为false
function searchTree(tree, content) {
    var equal = (tree.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, "") === content);
    if (!equal && tag) {
        search.push(tree);
        for (var i = 0; i < tree.children.length; i++) {
            searchTree(tree.children[i], content);
        }
    } else if (equal) {
        search.push(tree);
        tag = false;
        return;
    }
}

window.onload = function() {
    var domTree = document.getElementById('top-level');

    document.getElementById('preorder').onclick = function() {
        clearResult();
        preOrder(domTree);
        animate(traverse, 2);
    };

    document.getElementById('search-btn').onclick = function() {
        var content = document.getElementById('search-txt').value;
        if (content === '') {
            alert('请填写要搜索的内容');
        } else {
            clearResult();
            searchTree(domTree, content);
            if (!tag) { //查询成功
                animate(search, 1);
            } else {
                animate(search, 3);
            }

        }
    };
}

//清理前一个遍历或搜索
function clearResult() {
    var allDiv = document.getElementsByTagName('div');
    for (var i = 0; i < allDiv.length; i++) {
        allDiv[i].style.backgroundColor = '#fff';
    }
    clearInterval(timer);
    traverse = [];
    search = [];
    tag = true;
}

//将遍历或搜索结果用动画展示
//searchOrTraverse:1-search,2-traverse,3-search no result
function animate(result, searchOrTraverse) {
    var i = 0;
    result[i].style.backgroundColor = '#fec8b0';
    timer = setInterval(function() {
        i++;
        if (i < result.length) {
            result[i - 1].style.backgroundColor = '#fff';
            result[i].style.backgroundColor = '#fec8b0';
        } else if (searchOrTraverse === 1) {
            clearInterval(timer);
            result[result.length - 1].style.backgroundColor = '#593c7f';
        } else if (searchOrTraverse === 2) {
            clearInterval(timer);
            result[result.length - 1].style.backgroundColor = '#fff';
        } else if (searchOrTraverse === 3) {
            clearInterval(timer);
            result[result.length - 1].style.backgroundColor = '#fff';
            alert('没查询到该搜索内容');
        }
    }, 500);

}
