window.onload = function () {
    var allItems = [];

    function viewRefresh() {
        var queue = document.getElementById("queue");
        queue.innerHTML = "";
        for (let i = 0; i < allItems.length; i++) {
            queue.innerHTML += "<div class='item'>" + allItems[i] + "</div>"
        }
    }

    document.getElementById("left_in").onclick = function () {
        var text = document.getElementsByTagName("textarea")[0].value;
        var str = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (e) {
            if (e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
        allItems = [...str, ...allItems];
        viewRefresh();
    };

    document.getElementById("right_in").onclick = function () {
        var text = document.getElementsByTagName("textarea")[0].value;
        var str = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (e) {
            if (e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
        allItems = [...allItems, ...str];
        viewRefresh();
    };

    document.getElementById("left_out").onclick = function () {
        allItems.shift();
        viewRefresh();
    };

    document.getElementById("right_out").onclick = function () {
        allItems.pop();
        viewRefresh();
    }

    document.getElementById("search").onclick = function () {
        viewRefresh();
        var items = document.getElementById("queue").children;
        var input = document.getElementsByTagName("input")[0];
        var value = input.value;
        var filterIndex = [];
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].indexOf(value) != -1) {
                filterIndex.push(i);
            }
        }
        for (let i = 0; i < filterIndex.length; i++) {
            let text = items[filterIndex[i]].innerText;
            let length = value.length;
            let allIndex = [];
            let index = 0;
            while (true){
                index = text.indexOf(value,index);
                if(index!=-1){
                    allIndex.push(index);
                    index = index+length;
                } else {
                    break;
                }
            }
            let newStr = "";
            for (let i = 0; i < text.length; i++) {
                for(let j = 0;j<allIndex.length;j++){
                    if (i == allIndex[j]) {
                        newStr += "<span style='color: blue;'>";
                        for (let j = 0; j < length; j++) {
                            newStr += text.charAt(i + j);
                        }
                        i = i + length ;
                        newStr += "</span>";
                        continue;
                    }
                }
                newStr += text.charAt(i);
            }
            items[filterIndex[i]].innerHTML = newStr;
        }
    }
};