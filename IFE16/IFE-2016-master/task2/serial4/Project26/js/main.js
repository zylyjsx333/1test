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

function getTime() {
    var date = new Date();
    var year = ("0000" + date.getFullYear()).substr(-4);
    var month = ("00" + (date.getMonth() + 1)).substr(-2);
    var day = ("00" + date.getDay()).substr(-2);
    var hour = ("00" + date.getHours()).substr(-2);
    var minute = ("00" + date.getMinutes()).substr(-2);
    var second = ("00" + date.getSeconds()).substr(-2);
    var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
}

var consoleText = document.getElementById("console-text");
function log(message, colour) {
    var date = new Date();
    var p = document.createElement("p");
    p.innerHTML = getTime() + " ";
    var span = document.createElement("span");
    span.innerHTML = message;
    span.style.color = colour;
    p.appendChild(span);
    consoleText.appendChild(p);
    console.log("%c" + message, "background-color:" + colour);
    consoleText.scrollTop = consoleText.scrollHeight;
}

(function() {
    var buttonClick = function() {
        var orbit = this.parentNode.dataset.id - 0;
        var message = this.dataset.type;
        switch(message) {
            case 'create':
                if (this.dataset.status == 'create') {
                    commander.createSpaceship(orbit);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                    this.nextElementSibling.nextElementSibling.disabled = false;
                    this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false;
                } 
                else {
                    commander.destroy(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
                    this.nextElementSibling.dataset.status = 'start';
                    this.nextElementSibling.innerHTML = '飞行';
                    this.nextElementSibling.nextElementSibling.disabled = true;
                    this.nextElementSibling.nextElementSibling.value = 1;
                    this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true;
                }
                break;
            case 'drive':
                if(this.dataset.status == 'start') {
                    commander.start(orbit);
                    this.dataset.status = 'stop';
                    this.innerHTML = '停止';
                } else {
                    commander.stop(orbit);
                    this.dataset.status = 'start';
                    this.innerHTML = '飞行';
                }
                break;
            case 'velo':
                var value = this.previousElementSibling.value - 0;
                commander.setRate(orbit, value);
                break;
        }
    };

    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++) {
        addEvent(buttons[i], "click", buttonClick);
    }
})();