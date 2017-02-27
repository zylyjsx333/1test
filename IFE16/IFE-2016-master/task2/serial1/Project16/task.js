/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * trim function
 */
function trim(str) {
    var regex = /[(^\s*)(\s*$)]/g;
    return str.replace(regex, "");
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = trim(document.getElementById("aqi-city-input").value);
    var aqi = trim(document.getElementById("aqi-value-input").value);
    if (!(/^[a-zA-Z\u4e00-\u9fa5]+$/.test(city))) {
        alert("城市名称输入有误！");
        return;
    }
    if (!(/^[0-9]+$/.test(aqi))) {
        alert("aqi值输入有误！");
        return;
    }
    if (aqiData[city] != undefined) {
        alert("已存在输入城市信息！");
        return;
    }
    aqiData[city] = aqi;
    console.log(aqiData);
}

/**
 * 判断当前object是否为空；
 * 渲染aqi-table表格的时候要用到
 */
function isEmpty(obj) {
    for (var cur in obj) {
<<<<<<< HEAD
        return false;
    }
=======
        console.log("bitch");
        return false;
    }
    console.log("fuck");
>>>>>>> hellozts4120/gh-pages
    return true;
} 

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var targetTable = document.getElementById("aqi-table");
    if (!isEmpty(aqiData)) {
        var str = "<tr><th>城市</th><th>空气质量</th><th>删除当前</th></tr>";
        for (var cur in aqiData) {
            str += "<tr><td>" + cur + "</td><td>" + aqiData[cur] + "</td><td><button onclick=\"delBtnHandle(\'" + cur + "\')\">删除</button></td></tr>";
        }
        targetTable.innerHTML = str;
    }
    else {
        targetTable.innerHTML = "";
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.

    delete aqiData[city];
    renderAqiList();
}

window.onload = function () {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    //兼容浏览器版本差异
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
    
    var btn = document.getElementById("add-btn");
    console.log(btn);
    addEvent(btn, "click", addBtnHandle);
}

//init();