window.onload = function () {
    var allItems = [];

    function sortItems() {
        for (var i = 0; i < allItems.length; i++) {
            for (var j = 0; j <allItems.length - i- 1; j++) {
                if (parseInt(allItems[j]) < parseInt(allItems[j + 1])) {
                    var temp = allItems[j];
                    allItems[j] = allItems[j + 1];
                    allItems[j + 1] = temp;
                }
            }
        }
        viewRefresh();
    }

    function viewRefresh() {
        var queue = document.getElementById("queue");
        queue.innerHTML = "";
        for (let i = 0; i < allItems.length; i++) {
            queue.innerHTML += "<div class='item' style='height:" + allItems[i] + "px'></div>"
        }
    }

    document.getElementById("left_in").onclick = function () {
        var text = document.getElementsByTagName("input")[0].value;
        if ((/^[0-9]+$/).test(text)&&(parseInt(text)>=10&&parseInt(text)<=100)) {
            if(allItems.length>=60){
                alert("The queue is full!");
            }else {
                allItems.unshift(text);
                viewRefresh();
            }
        } else {
            alert("Please enter a legal Integer");
        }
    };

    document.getElementById("right_in").onclick = function () {
        var text = document.getElementsByTagName("input")[0].value;
        if ((/^[0-9]+$/).test(text)&&(parseInt(text)>=10&&parseInt(text)<=100)) {
            if(allItems.length>=60){
                alert("The queue is full!");
            }else {
                allItems.push(text);
                viewRefresh();
            }
        } else {
            alert("Please enter a legal Integer");
        }
    };

    document.getElementById("left_out").onclick = function () {
        allItems.shift();
        viewRefresh();
    };

    document.getElementById("right_out").onclick = function () {
        allItems.pop();
        viewRefresh();
    }
    document.getElementById("sort").onclick = function () {
        sortItems();
    }
};