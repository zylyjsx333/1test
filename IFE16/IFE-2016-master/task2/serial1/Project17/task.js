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
window.onload = function() {
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
    
    var cityName = ["北京", "上海", "广州", "深圳", "成都", "西安", "福州", "厦门", "沈阳"];

    // 用于渲染图表的数据
    var chartData = {};

    // 记录当前页面的表单选项
    var pageState = {
      nowSelectCity: -1,
      nowGraTime: "day"
    }

    //随机生成颜色
    function randomColor() {
        var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        return ((rand.length == 6) ? rand : randomColor());
    }

    /**
     * 渲染图表
     */
    function renderChart() {
        var tar = document.getElementById("aqi-chart-wrap");
        var count = 0;
        console.log(tar);
        if (pageState.nowSelectCity == -1) {
            tar.innerHTML = "";
            alert("请选择城市！");
            return false;
        }
        tar.innerHTML = "";
        for (var cur in chartData) {
            if (count == pageState.nowSelectCity) {
                var data = chartData[cur][pageState.nowGraTime];
                for (var key in data) {
                    var color = randomColor();
                    var div = document.createElement("div");
                    div.style.height = (data[key]*1)+"px";
                    div.title = "城市：" + cityName[pageState.nowSelectCity] + "，Aqi值：" + data[key];
                    if (pageState.nowGraTime == "day") {
                        div.style.width = "10px";
                    }
                    else if (pageState.nowGraTime == "week") {
                        div.style.width = "50px";
                    }
                    else {
                        div.style.width = "150px";
                    }
                    div.style.background = "#" + color;
                    document.getElementById("aqi-chart-wrap").appendChild(div);
                }
            }
            count++;
        }
    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(t) {
        if (this != t.target && t.target.tagName.toLocaleLowerCase()!="label") {
            if (t.target.value == pageState.nowGraTime) {
                return false;
            }
        }
        pageState.nowGraTime = t.target.value;
        renderChart();
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(t) {
        if (t.target.value == pageState.nowSelectCity) {
            return false;
        }
        pageState.nowSelectCity = t.target.value;
        renderChart();
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var tar = document.getElementById("form-gra-time");
        addEvent(tar, "click", graTimeChange);
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        var n = 0;
        var html = "<option value=-1>--请选择城市--</option>";
        for (var cur in aqiSourceData) {
            html += "<option value=" + n + ">" + cur + "</option>";
            n++;
        }
        var cityTar = document.getElementById("city-select");
        cityTar.innerHTML = html;
        cityTar.onchange = citySelectChange;

    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        for (var cur in aqiSourceData) {
            chartData[cur] = {
                day: {},
                week: {},
                month: {}
            };
            var n = 0, weekNum = 0;
            var sum = 0;
            chartData[cur]["day"] = aqiSourceData[cur];
            for (var key in aqiSourceData[cur]) {
                n++;
                sum += aqiSourceData[cur][key];
                
                if (n % 7 == 0) {
                    weekNum++;
                    chartData[cur]["week"][weekNum] = parseInt(sum / 7);
                    sum = 0;
                }
                else {
                    chartData[cur]["week"][weekNum] = parseInt(sum / (n % 7));
                    sum = 0;
                }
            }
            for (var i = 1; i <= 12; i++) {
                var sum = 0;
                for(var j = 1; j <= 31; j++){
                    if(aqiSourceData[cur]["2016-"+[((i+'').length == 1) ? ("0" + i) : i] + "-" + [(('' + j).length == 1) ? ("0" + j) : j]]) {
                        sum += aqiSourceData[cur]["2016-"+[((i + '').length == 1) ? ("0" + i) : i] + "-" + [(('' + j).length == 1) ? ("0" + j) : j]];
                        chartData[cur]["month"][i] = parseInt(sum / j);
                    }
                }
            }
        }

    }

    /**
     * 初始化函数
     */
    function init() {
      initGraTimeForm()
      initCitySelector();
      initAqiChartData();
    }

    init();
}