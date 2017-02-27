/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

function calLeft(i) {
    var len
    if (i == 0) len = 12;
    else {
        len = (i * 2 - 1) * 6.5 + 18;
    }
    return len;
}

function randomColor() {
    var a = Math.random() * 13 - 1;
    return colors[parseInt(a)];
}

/**
 * 渲染图表
 */
function renderChart() {
    let city = aqiSourceData[pageState.nowSelectCity];
    var n = Object.getOwnPropertyNames(city).length;
    var chartWrap = document.getElementById("aqi-chart-wrap");
    chartWrap.innerHTML = "";
    chartWrap.innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市01-03月日空气质量报告</div>"
    for (let i = 0; i < n; i++) {
        chartWrap.innerHTML += "<div class='aqi-bar day' style = 'left:" + calLeft(i) + "px;background:" + randomColor() + ";height:" + city[Object.getOwnPropertyNames(city)[i]] + "px;width: 6px'></div>"
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    pageState['nowSelectCity'] = this.options[this.selectedIndex].text;
    renderChart();
}


/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var sel = document.getElementById("city-select");
    sel.addEventListener("change",citySelectChange);
}

/**
 * 初始化函数
 */
function init() {
    initCitySelector();
}
renderChart();
init();