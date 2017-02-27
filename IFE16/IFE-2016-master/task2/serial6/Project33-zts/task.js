var car = document.getElementById("car");
var submit = document.getElementById("submit");

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//初始化网格页面
function init() {
    var row = document.getElementsByTagName("li");
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var div = document.createElement("div");
            row[i + 10].appendChild(div);
        }
    }
    car.style.left = Math.ceil(Math.random() * 9) * 40+ "px";
    car.style.top = Math.ceil(Math.random() * 9) * 40+ "px";
    car.style.transform = "rotateZ(0deg)";
}

//设置方向
function setDirection(degree) {
    var preDegree = parseInt((car.style.transform).match(/[-]*\d+/g)[0]);
    car.style.transform = 'rotateZ(' + (degree + preDegree) + 'deg)';
}

//处理指令
var command = {
    commandGo: function() {
        var degree = parseInt((car.style.transform).match(/[-]*\d+/g)[0]);
        switch(degree % 360) {
            case -0:
            case 0: {
                if (car.style.top === '40px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.top = (parseInt(car.style.top) - 40) + 'px';
                break;
            }
            case -270:
            case 90: {
                if (car.style.left === '360px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.left = (parseInt(car.style.left) + 40) + 'px';
                break;
            }            
            case -180:
            case 180: {
                if (car.style.top === '400px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.top = (parseInt(car.style.top) + 40) + 'px';
                break;
            }
            case -90:
            case 270: {
                if (car.style.left === '0px') {
                    alert("已到达边缘，不能前进！");
                    return false;
                }
                car.style.left = (parseInt(car.style.left) - 40) + 'px';
                break;
            }
        }
    },
    
    commandLeft: function() {
        setDirection(-90);
    },
    
    commandRight: function() {
        setDirection(90);
    },
    
    commandBack: function() {
        setDirection(180);
    } 
}

window.onload = function() {
    addEvent(submit, "click", function(){
        var inputValue = (document.getElementById("commandInput").value).toUpperCase();
        switch(inputValue) {
            case 'GO': return command.commandGo();
            case 'TUN LEF': return command.commandLeft();
            case 'TUN RIG': return command.commandRight();
            case 'TUN BAC': return command.commandBack();
        }
        alert("输入的指令有误！");
    });
    
    addEvent(document, "keyup", function(e) {
        var event = e || window.event;
        switch(event.keyCode) {
            case 37: return command.commandLeft();
            case 38: return command.commandGo();
            case 39: return command.commandRight();
            case 40: return command.commandBack();
        }
    });
    
    init();
}