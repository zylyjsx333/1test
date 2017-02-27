function tableForm(data) {
    
    var that = this;
    this.mainTable = document.createElement("table");
    this.lockedForm = document.createElement("table");
    this.lockCount = 0;

    this.createTable = function() {
        that.mainTable.setAttribute("class", "target-form");
        that.lockedForm.setAttribute("class", "locked-form");
        that.lockedForm.style.left = that.mainTable.offsetLeft + "px";
        var firstTr = document.createElement("tr");
        for (var i = 0; i < data.colName.length; i++) {
            var curTh = document.createElement("th");
            curTh.innerHTML = (data.colName)[i];
            firstTr.appendChild(curTh);
        }
        that.mainTable.appendChild(firstTr);
        for (var i = 0; i < data.rowData.length; i++) {
            var curTr = document.createElement("tr");
            for (var j = 0; j < data.colName.length; j++) {
                var curTd = document.createElement("td");
                curTd.innerHTML = ((data.rowData)[i])[j];
                curTr.appendChild(curTd);
            }
            that.mainTable.appendChild(curTr);
        }
    };
    
    this.addLockTableRow = function(rowId) {
        var curTr = document.createElement("tr");
        var AllTr = $("tr");
        curTr.innerHTML = AllTr[rowId + that.lockCount].innerHTML;
        that.lockedForm.appendChild(curTr);
        that.lockCount++;
    };
    
    this.checkLockTable = function(rowId) { 
        that.lockedForm.style.left = that.mainTable.offsetLeft + "px";
        var toTop = document.documentElement.scrollTop + document.body.scrollTop;
        if (toTop > that.mainTable.offsetTop + that.mainTable.clientHeight || toTop < that.mainTable.offsetTop) {
            that.lockedForm.innerHTML = "";
            that.lockedForm.style.position = "";
            that.lockCount = 0;
        }
        else {
            if (that.lockedForm.style.position == "fixed") return;
            if (document.documentElement.scrollTop + document.body.scrollTop > that.mainTable.offsetTop) {
                that.lockedForm.style.position = "fixed";
                that.addLockTableRow(rowId);
            }
        }
    };
    
    this.delegateEvent = function() {
        addEvent(window, "scroll", function() {
            return function(){return that.checkLockTable(0)};
        }());
        addEvent(window, "resize", function() {
            return function(){return that.checkLockTable(0)};
        }());
    };
    
    this.init = function() {
        that.createTable();
        that.delegateEvent();
        document.body.appendChild(that.mainTable);
        document.body.appendChild(that.lockedForm);
    }
}

window.onload = function() {
    var newForm = new tableForm(data);
    newForm.init(); 
    
    //add some craps...
    for (var i = 0; i < 40; i++) {
        document.body.appendChild(document.createElement("br"));
    }
}
