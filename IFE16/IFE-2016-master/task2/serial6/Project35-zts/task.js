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

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = null;
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
    commandGo: function(num) {
        var degree = parseInt((car.style.transform).match(/[-]*\d+/g)[0]);
        if (num !== 111) {
            degree = num;
        }
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
    },

    commandTraTop: function() {
        this.commandGo(0);
    },
    
    commandTraLef: function() {
        this.commandGo(270);
    },
    
    commandTraRig: function() {
        this.commandGo(90);
    },
    
    commandTraBac: function() {
        this.commandGo(180);
    },
    
    commandMovTop: function() {
        car.style.transform = 'rotateZ(0deg)';
        this.commandGo(111);
    },
    
    commandMovLef: function() {
        car.style.transform = 'rotateZ(-90deg)';
        this.commandGo(111);
    },
    
    commandMovRig: function() {
        car.style.transform = 'rotateZ(90deg)';
        this.commandGo(111);
    },
    
    commandMovBac: function() {
        car.style.transform = 'rotateZ(180deg)';
        this.commandGo(111);
    }
}

window.onload = function() {
    var queue = [];
    var timer = null;
    
    function clearCommand() {
        document.getElementById("commandInput").value = "";
        document.getElementById("command-row").innerHTML = "";
    }
    
    function getCommand() {
        var inputValue = (document.getElementById("commandInput").value).toUpperCase();
        var inputArray = inputValue.split("\n");
        for (var cur = 0; cur < inputArray.length; cur++) {
            if (/\d+/.test(inputArray[cur]) && !(/TUN/.test(inputArray[cur]))) {
                for (var i = 0; i < inputArray[cur].match(/\d+/); i++) {
                    dealCommand(inputArray[cur].replace(/\s+\d+\s*/g, ''));
                }
            }
            else dealCommand(inputArray[cur]);
        }
    }
    
    function dealCommand(input) {
        if (input) {
            queue.push(input);
        }
        if (timer) {
            return false;
        }
        else {
            return timer = setTimeout(function(){
                clearTimeout(timer);
                timer = null;
                var cur = queue.shift();
                switch(cur) {
                    case 'GO': command.commandGo(111); break;
                    case 'TRA TOP': command.commandTraTop(); break;
                    case 'TRA LEF': command.commandTraLef(); break;
                    case 'TRA RIG': command.commandTraRig(); break;
                    case 'TRA BAC': command.commandTraBac(); break;
                    case 'TUN LEF': command.commandLeft(); break;
                    case 'TUN RIG': command.commandRight(); break;
                    case 'TUN BAC': command.commandBack(); break;
                    case 'MOV TOP': command.commandMovTop(); break;
                    case 'MOV LEF': command.commandMovLef(); break;
                    case 'MOV RIG': command.commandMovRig(); break;
                    case 'MOV BAC': command.commandMovBac(); break;
                    default: alert("输入的指令有误！"); throwError(cur); queue = []; break;   
                }
                if (queue.length) {
                    dealCommand();
                }
            }, 500);
        }
    };

    function throwError(error) {
        console.log(error);
        var lineObj = document.getElementsByClassName("line");
        var command = document.getElementById("commandInput").value.split("\n");
        for (var cur = 0; cur < command.length; cur++) {
            console.log(command[cur].replace(/\s+\d+\s*/g, ''));
            if (error == command[cur].toUpperCase() || error == command[cur].replace(/\s+\d+\s*/g, '').toUpperCase()) {
                lineObj[cur].style.background = "red";
            }
        }
    }    
    
    //键盘操作
    function keyboardCtrl(e) {
        var event = e || window.event;
        switch(event.keyCode) {
            case 37: return command.commandLeft();
            case 38: return command.commandGo(111);
            case 39: return command.commandRight();
            case 40: return command.commandBack();
            case 73: return command.commandTraTop();
            case 74: return command.commandTraLef();
            case 75: return command.commandTraBac();
            case 76: return command.commandTraRig();
            case 87: return command.commandMovTop();
            case 65: return command.commandMovLef();
            case 68: return command.commandMovRig();
            case 83: return command.commandMovBac();
        }
    }
    
    //方向键上下左右：GO, TUNBAC, TUNLEF, TUNRIG
    //键盘IJKL：TRATOP, TRABAC, TRALEF, TRARIG
    function checkCtrl(){
        if (document.getElementById("keyboard-ctrl").checked) {
            addEvent(document, "keyup", keyboardCtrl);
        }
        else removeEvent(document, "keyup", keyboardCtrl);
    }
    
    function updateLineNumber(number) {
        var target = document.getElementById("command-row");
        target.innerHTML = "";
        for (var cur = 0; cur < number; cur++) {
            var li = document.createElement("li");
            li.className = "line";
            li.style.height = "15px";
            li.style.marginTop = "0px";
            var txt = document.createTextNode(cur + 1);
            li.appendChild(txt);
            target.appendChild(li);
        }
    }
    
    function syncScroll() {
        var target = document.getElementById("command-row");
        var lineObj = document.getElementsByClassName("line");
        var command = document.getElementById("commandInput");
        lineObj[0].style.marginTop = -command.scrollTop + "px";
    }
    
    addEvent(document.getElementById("keyboard-ctrl"), "click", checkCtrl);
    
    addEvent(document.getElementById("refresh"), "click", clearCommand);
    
    addEvent(document.getElementById("commandInput"), "scroll", syncScroll);
    
    addEvent(document.getElementById("commandInput"), "keydown", function() {
        setTimeout(function(){
            var input = document.getElementById("commandInput").value;
            input.match(/\n/g) ? updateLineNumber(input.match(/\n/g).length+1) : updateLineNumber(1);
            syncScroll();
        }, 0)
    })
    
    //绑定提交执行命令的按钮事件
    addEvent(submit, "click", getCommand);
    
    init();
    checkCtrl();
}