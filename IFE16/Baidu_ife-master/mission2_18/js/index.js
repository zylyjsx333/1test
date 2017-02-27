window.onload = function () {
    var allItems = [];

    function viewRefresh(){
        var queue = document.getElementById("queue");
        queue.innerHTML = "";
        for(let i = 0;i<allItems.length;i++){
            queue.innerHTML += "<div class='item'>"+allItems[i]+"</div>"
        }
    }

    document.getElementById("left_in").onclick = function(){
        var text = document.getElementsByTagName("input")[0].value;
        if((/^[0-9]+$/).test(text)){
            allItems.unshift(text);
            viewRefresh();
        }else {
            alert("Please enter an Integer");
        }
    };

    document.getElementById("right_in").onclick = function(){
        var text = document.getElementsByTagName("input")[0].value;
        if((/^[0-9]+$/).test(text)){
            allItems.push(text);
            viewRefresh();
        }else {
            alert("Please enter an Integer");
        }
    };

    document.getElementById("left_out").onclick = function () {
        allItems.shift();
        viewRefresh();
    };

    document.getElementById("right_out").onclick = function(){
        allItems.pop();
        viewRefresh();
    }
};