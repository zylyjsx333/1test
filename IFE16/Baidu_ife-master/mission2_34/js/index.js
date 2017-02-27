window.onload = function () {
    var position = [1, 1];
    var block = document.getElementsByClassName("red")[0];
    window.status = "top";
    var left = 52;
    var top = 51;
    window.addEventListener("keydown", changeDirection);
    function changeDirection() {
        if (event.keyCode == 37) {
            block.style.transform = "rotate(-90deg)";
            window.status = "left";
        } else if (event.keyCode == 38) {
            block.style.transform = "rotate(0deg)";
            window.status = "top";
        } else if (event.keyCode == 39) {
            block.style.transform = "rotate(90deg)";
            window.status = "right";
        } else if (event.keyCode == 40) {
            block.style.transform = "rotate(180deg)";
            window.status = "bottom";
        }
//65,87,68,83
        if (event.keyCode == 65) {
            if(!(left<=52)){
                block.style.transform = "rotate(-90deg)";
                left = left - 51;
                block.style.left = left + "px";
            }else {
                block.style.transform = "rotate(-90deg)";
                alert("已到达边界~~");
            }
        } else if (event.keyCode==87) {
            if(!(top<=52)){
                block.style.transform = "rotate(0deg)";
                top = top - 51;
                block.style.top = top + "px";
            }else {
                block.style.transform = "rotate(0deg)";
                alert("已到达边界~~");
            }
        } else if (event.keyCode == 68) {
            if(!(left>=511)){
                block.style.transform = "rotate(90deg)";
                left = left + 51;
                block.style.left = left + "px";
            }else{
                block.style.transform = "rotate(90deg)";
                alert("已到达边界~~");
            }
        } else if(event.keyCode == 83){
            if(!(top>=510)) {
                block.style.transform = "rotate(180deg)";
                top = top + 51;
                block.style.top = top + "px";
            }else {
                block.style.transform = "rotate(180deg)";
                alert("已到达边界~~");
            }
        }
    }
};