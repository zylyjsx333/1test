var traverse = [];//存放遍历结果
var timer;

//前序遍历
function preOrder(tree) {
    if (tree !== null) {
        traverse.push(tree);
        preOrder(tree.firstElementChild);
        preOrder(tree.lastElementChild);
    }
}

//中序遍历
function inOrder(tree) {
    if (tree !== null) {
        inOrder(tree.firstElementChild);
        traverse.push(tree);
        inOrder(tree.lastElementChild);
    }
}

//后序遍历
function postOrder(tree) {
    if (tree !== null) {
        postOrder(tree.firstElementChild);
        postOrder(tree.lastElementChild);
        traverse.push(tree);
    }
}

window.onload = function() {
    var domTree = document.getElementById('top-level');

    document.getElementById('preorder').onclick = function() {
    	clearTraverse();
        preOrder(domTree);
        animate(traverse);
    };

    document.getElementById('inorder').onclick = function() {
    	clearTraverse();
        inOrder(domTree);
        animate(traverse);
    };

    document.getElementById('postorder').onclick = function() {
    	clearTraverse();
        postOrder(domTree);
        animate(traverse);
    };
}

//清理前一个遍历
function clearTraverse(){
	var allDiv = document.getElementsByTagName('div');
	for(var i=0;i<allDiv.length;i++){
		allDiv[i].style.backgroundColor = '#fff';
	}
	clearInterval(timer);
	traverse = [];
}

//将遍历结果用动画展示
function animate(traverse){
	var i = 0;
	traverse[i].style.backgroundColor = '#fec8b0';
	timer = setInterval(function() {
	    i++;
	    if (i < traverse.length) {
	        traverse[i - 1].style.backgroundColor = '#fff';
	        traverse[i].style.backgroundColor = '#fec8b0';
	    } else {
	        clearInterval(timer);
	        traverse[traverse.length - 1].style.backgroundColor = '#fff';
	    }
	}, 500);
}