var isShow = 0;
(function($) {
    //upperYear: year distance between current year and the maximum year you want to set...
    //lowerYear: year distance between current year and the minimum year you want to set...
    $.calendar = function(selector, upperYear, lowerYear){
        //first, remove the calendar we already made...(if exists)
        $(".calendarTitle,.select-date").remove();
        $(selector).append(
            '<div class="calendarTitle">'+
                '<select id="month"></select>'+
                '<select id="year"></select>'+
            '</div>'+
            '<div class="select-date">'+
                '<table>'+
                    '<thead></thead>'+
                    '<tbody></tbody>'+
                '</table>'+
            '</div>');
        
        initDOM();
            
        //interface to get the current date's data;
        //fomular of the data is an array: ['curYear', 'curMonth', 'curDate', 'curDay'];
        this.getCurrentTime = function () {
            return curTime();
        }
        
        //interface to set the date...
        this.setTime = function (data) {
            var setYear = data.split("-")[0];
            var setMonth = data.split("-")[1];
            var setDate = data.split("-")[2];
            document.getElementById("date-input").value = currYear + "" + currMonth + "" + currDate;
            $(".calendarTitle,.select-date").remove();
        }
        
        function curTime() {
            var now = new Date();
            var second = now.getSeconds();
            var minute = now.getMinutes();
            var hour = now.getHours;
            var date = now.getDate();
            var day = now.getDay();
            var month = now.getMonth();
            var year = now.getFullYear();
            return [year, month + 1, date, day];
        }
        
        //init DOM of month and year
        function initDOM() {
            for (var i = -1 * lowerYear; i <= upperYear; i++) {
                var curOption = document.createElement("option");
                curOption.value = curTime()[0] + i + "年";
                curOption.innerHTML = curTime()[0] + i + "年";
                if (i == 0) {
                    curOption.selected = "selected";
                }
                $("#year").append(curOption);
            }
            for (var i = 1; i <= 12; i++) {
                var curOption = document.createElement("option");
                curOption.value = i + "月";
                curOption.innerHTML = i + "月";
                if (i == curTime()[1]) {
                    curOption.selected = "selected";
                }
                $("#month").append(curOption);
            }
            
            $("#month").on('change',function(e){
                var curMonth = parseInt(this.selectedOptions[0].value.split("月")[0]);
                var curYear = parseInt(document.getElementById("year").selectedOptions[0].value.split("年")[0]);
                addDateInfo(curYear, curMonth);
            })
            $("#year").on('change',function(e){
                var curYear = parseInt(this.selectedOptions[0].value.split("年")[0]);
                var curMonth = parseInt(document.getElementById("month").selectedOptions[0].value.split("月")[0]);
                addDateInfo(curYear, curMonth);
            })
            
            var titleArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            var curTr = document.createElement('tr');
            for (var i in titleArr) {
                var cur = document.createElement('th');
                cur.innerHTML = titleArr[i];
                curTr.appendChild(cur);
            }
            $(".select-date table thead").append(curTr);
            addDateInfo(curTime()[0], curTime()[1]);
        }
        
        function addDateInfo(year, month){
            $(".select-date table tbody tr").remove();
            var sumCurMonthDate = getMonthDate(year, month);
            var sumPrevMonthDate = getMonthDate(year, month - 1);
            var curMonthFirstDay = new Date(year + "/" + month + "/" + 1).getDay();
            var curMonthLastDay = new Date(year + "/" + month + "/" + sumCurMonthDate).getDay();
            var curTr = document.createElement('tr');
            for(var i = (sumPrevMonthDate - curMonthFirstDay + 1); i <= sumPrevMonthDate; i++){
                var curTd = document.createElement('td');
                curTd.innerHTML = i;
                curTd.className = 'prevMonth';
                curTr.appendChild(curTd);
            }
            for(var i = 1; i <= sumCurMonthDate; i++){
                var curTd = document.createElement('td');
                curTd.innerHTML = i;
                curTd.className = 'currMonth';
                if(i == curTime()[2]){
                    curTd.className = 'currMonth currDate';
                }
                curTr.appendChild(curTd);
            }
            if(curMonthLastDay !== 6){
                for(var start = 1; start <= (6 - curMonthLastDay); start++){
                    var curTd = document.createElement('td');
                    curTd.innerHTML = start;
                    curTd.className = 'nextMonth';
                    curTr.appendChild(curTd);
                }
            }
            
            $(".select-date table tbody").append(curTr);
            $(".currMonth").on("click", function(e){
                var currYear = document.getElementById("year").selectedOptions[0].value;
                var currMonth = document.getElementById("month").selectedOptions[0].value;
                var currDate = e.target.innerHTML + '日';
                document.getElementById("date-input").value = currYear + "" + currMonth + "" + currDate;
                $(".calendarTitle,.select-date").remove();
                isShow = 0;
            })
        }
        
        function getMonthDate(year, month) {
            if (month == 0) {
                year -= 1;
                month = 12;
            }
            switch (month) {
                case 1:
                    return 31;
                    break;
                case 3:
                    return 31;
                    break;
                case 5:
                    return 31;
                    break;
                case 7:
                    return 31;
                    break;
                case 8:
                    return 31;
                    break;
                case 10:
                    return 31;
                    break;
                case 12:
                    return 31;
                    break;
                case 4:
                    return 30;
                    break;
                case 6:
                    return 30;
                    break;
                case 9:
                    return 30;
                    break;
                case 11:
                    return 30;
                    break;
                case 2:
                    if (year % 4 != 0) {
                        return 28;
                    }
                    else if (year % 100 == 0 && year % 400 != 0) {
                        return 28;
                    }
                    else return 29;
                    break;
            }
        } 
    }
})($)

$(function(){

	$("#date-input,#icon").on("click",function() {
		if (!isShow) {
            $.calendar(".container", 20, 20);
            isShow = 1;
        }
        else {
            $(".calendarTitle,.select-date").remove();
            isShow = 0;
        }
	});

})