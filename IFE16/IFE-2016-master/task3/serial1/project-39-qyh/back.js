// window.onload = function(){

//   document.querySelector(".table").addEventListener('click', function(e) {
//       sort(e);
//   }, false);
// 	function sort(e){
// 		console.log(e.target);
// 	}

// }
var thIndex = 0,
  curThIndex = null;

$(function() {
  $('table thead tr th').click(function() {
  	console.log(thIndex)
    thIndex = $(this).index();
    if (thIndex != curThIndex) {
      curThIndex = thIndex;
      sorting = [];
      tbodyHtml = null;
      $('table tbody tr').each(function() {
        sorting.push($(this).children('td').eq(curThIndex).html() + ', ' + $(this).index());
      });

      sorting = sorting.sort();
      sortIt();
    }
  });
})

function sortIt() {
  for (var sortingIndex = 0; sortingIndex < sorting.length; sortingIndex++) {
    rowId = parseInt(sorting[sortingIndex].split(', ')[1]);
    tbodyHtml = tbodyHtml + $('table tbody tr').eq(rowId)[0].outerHTML;
  }
  $('table tbody').html(tbodyHtml);
}
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

