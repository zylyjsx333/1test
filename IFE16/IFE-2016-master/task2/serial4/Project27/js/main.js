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

var driverModel = [
    {model: '前进号', velo: 3, consume: 5},
    {model: '奔腾号', velo: 5, consume: 7},
    {model: '超越号', velo: 8, consume: 9},
    {model: '蛤蛤号', velo: 20, consume: 20}
];
var energyModel = [
    {model: '劲量型', energy: 2},
    {model: '光能型', energy: 3},
    {model: '永久型', energy: 4},
    {model: '蛤蛤型', energy: 20}
];

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
                var drive = this.previousElementSibling.previousElementSibling;
                var energy = this.previousElementSibling;
                if(this.dataset.status == 'create') {
                    commander.createSpaceship(orbit, drive.value - 0, energy.value - 0);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                    drive.disabled = true;
                    energy.disabled = true;
                } else {
                    commander.destroy(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
                    this.nextElementSibling.dataset.status = 'start';
                    this.nextElementSibling.innerHTML = '飞行';
                    drive.disabled = false;
                    energy.disabled = false;
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
        }
    };
    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++) {
        addEvent(buttons[i], "click", buttonClick);
    }
})();

(function() {
    var selects = document.getElementById("control-main").getElementsByTagName("select");
    var option;
    for(var i = 0; i < selects.length; i++) {
        var j;
        if(selects[i].dataset.type == 'drive') {
            for(j = 0; j < driverModel.length; j++) {
                option = document.createElement("option");
                option.setAttribute("value", j.toString());
                option.innerHTML = driverModel[j].model +
                    "（rate: " + driverModel[j].velo +
                    "&#176;&#47;s，consume: " + driverModel[j].consume + "&#37;&#47;s）";
                selects[i].appendChild(option);
            }
        } else {
            for(j = 0; j < energyModel.length; j++) {
                option = document.createElement("option");
                option.setAttribute("value", j.toString());
                option.innerHTML = energyModel[j].model +
                    "（charge: " + energyModel[j].energy + "&#37;&#47;s）";
                selects[i].appendChild(option);
            }
        }
    }
})();