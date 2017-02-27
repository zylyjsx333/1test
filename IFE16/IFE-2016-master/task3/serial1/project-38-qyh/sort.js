window.onload = function() {
    var data = {
        col: ["标题", "数字", "字符串", "日期"],
        row: [
            ["test1", 1, 'Today is a nice day!', '12/04/2015'],
            ["test2", 4, 'Second', '10/04/2015'],
            ["test4", 2, 'Third', '11/04/2015'],
            ["test3", 6, 'Five', '19/04/2015']
        ]
    };
    tableFactory(data);


    function tableFactory(data) {
        var tableFactory = {

            makeTable: function() {
                var that = this;
                var table = document.querySelector(".table");
                var thead = document.createElement("thead");
                var tbody = document.createElement("tbody");
                var tr = document.createElement("tr");
                for (var i = 0; i < data.col.length; i++) {
                    var th = document.createElement("th");
                    th.innerHTML = (data.col)[i];
                    th.className = 'sortable';
                    th.addEventListener('click', function(e) {
                        that.toggleClass(e);
                    }, false);
                    tr.appendChild(th);
                }
                thead.appendChild(tr);
                table.appendChild(thead);

                for (var i = 0; i < data.row.length; i++) {
                    var tr = document.createElement("tr");
                    for (var j = 0; j < data.col.length; j++) {
                        var td = document.createElement("td");
                        td.innerHTML = ((data.row)[i])[j];
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                    table.appendChild(tbody);

                }
            },

            toggleClass: function(e) {

                if (e.target.className == 'sortable asc') {
                    e.target.className = 'sortable desc';
                } else if (e.target.className == 'sortable desc') {
                    e.target.className = 'sortable asc';
                }
                if (e.target.className == 'sortable') {
                    e.target.className = 'sortable asc';
                }
            },

            init: function() {
                var that = this;
                that.makeTable();
                makeAllSortable();
            }

        }
        return tableFactory.init();
    }

    function sortTable(table, col, reverse) {

        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function(a, b) { 
        	//如果 stringObject 小于 target，则 localeCompare() 返回小于 0 的数。
        	//如果 stringObject 大于 target，则该方法返回大于 0 的数。
        	//如果两个字符串相等，或根据本地排序规则没有区别，该方法返回 0。
        	console.log('a' + a.cells);
            return reverse // `-1 *` if want opposite order
                * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                    .localeCompare(b.cells[col].textContent.trim())
                );
        });
        for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    }

    function makeSortable(table) {
        var th = table.tHead,
            i;
        th && (th = th.rows[0]) && (th = th.cells);
        if (th) i = th.length;
        else return; // 如果没有 <thead>那么就返回
        while (--i >= 0)(function(i) {
            var dir = 1;
            th[i].addEventListener('click', function() { sortTable(table, i, (dir = 1 - dir)) });
        }(i));
    }

    function makeAllSortable(parent) {
        parent = parent || document.body;
        var t = parent.getElementsByTagName('table'),
            i = t.length;
        while (--i >= 0) makeSortable(t[i]);
    }

}




// window.onload = function(){

//   document.querySelector(".table").addEventListener('click', function(e) {
//       sort(e);
//   }, false);
// 	function sort(e){
// 		console.log(e.target);
// 	}
// 	makeAllSortable();
// }






// var $sortable = $('.sortable');

// $sortable.on('click', function(){

//   var $this = $(this);
//   var asc = $this.hasClass('asc');
//   var desc = $this.hasClass('desc');
//   $sortable.removeClass('asc').removeClass('desc');
//   if (desc || (!asc && !desc)) {
//     $this.addClass('asc');
//   } else {
//     $this.addClass('desc');
//   }

// });
