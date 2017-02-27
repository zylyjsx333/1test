
function tableForm(data) {
    
    var that = this;
    this.allData = [];
    this.mainTable = document.createElement("table");

    this.createTable = function() {
        that.mainTable.setAttribute("class", "target-form");
        var firstTr = document.createElement("tr");
        for (var i = 0; i < data.colName.length; i++) {
            var curTh = document.createElement("th");
            curTh.innerHTML = (data.colName)[i];
            if (i > 0) {
                var i1 = document.createElement("i");
                var i2 = document.createElement("i");
                i1.className = "arrow-down";
                addEvent(i1, "click", function(i) {
                    return function(){return that.sortTable(i, "asc")};
                }(i));
                i2.className = "arrow-up";
                addEvent(i2, "click", function(i) {
                    return function(){return that.sortTable(i, "des")};
                }(i));
                curTh.appendChild(i1);
                curTh.appendChild(i2);
            }
            firstTr.appendChild(curTh);
        }
        that.mainTable.appendChild(firstTr);
        for (var i = 0; i < data.rowData.length; i++) {
            var curTr = document.createElement("tr");
            var curData = [];
            for (var j = 0; j < data.colName.length; j++) {
                var curTd = document.createElement("td");
                curTd.innerHTML = ((data.rowData)[i])[j];
                curData.push(((data.rowData)[i])[j]);
                curTr.appendChild(curTd);
            }
            that.allData.push(curData);
            that.mainTable.appendChild(curTr);
        }
    };

    this.sortTable = function(sortId, method) {
        console.log(sortId);
        console.log(method);
        that.allData.sort(function(array1, array2) {
            if (method === "des") {
                return (parseInt(array1[sortId]) <= parseInt(array2[sortId]) ? 1 : -1);
            }
            else if (method === "asc") {
                return (parseInt(array1[sortId]) <= parseInt(array2[sortId]) ? -1 : 1);
            }
        });
        that.redrawTable();
    };

    this.redrawTable = function() {
        var rows = that.mainTable.childNodes;
        for (var i = 1; i < rows.length; i++) {
            rows[i].innerHTML = "";
            for (var j = 0; j < data.colName.length; j++) {
                var curTd = document.createElement("td");
                curTd.innerHTML = ((that.allData)[i - 1])[j];
                rows[i].appendChild(curTd);
            }
        }
    };
    
    this.init = function() {
        that.createTable();
        that.sortTable(5, "des");
        document.body.appendChild(that.mainTable);
    }
}

window.onload = function() {
    var newForm = new tableForm(data);
    newForm.init();
}