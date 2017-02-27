/**
 * Created by Lijinyao on 2016/4/11.
 */
function $(selector){
    return document.querySelector(selector);
}

function Dialog() {
    this.cancel = $(".dialog-window-cancel");
    this.commit = $(".dialog-window-commit");
    this.dialog =  $(".dialog");
    var myDialog = this.dialog;
    this.cancel.addEventListener("click", function () {
        hide();
    });
    this.commit.addEventListener("click", function () {
        hide();
    });
    this.dialog.addEventListener("click", function (e) {
        if(e.target== myDialog){
            hide();
        }
    });
    function hide() {
       myDialog.style.display='none';
    }
}
Dialog.prototype = {
    constructor: Dialog,
    show: function () {
        this.dialog.style.display='block';
    },
    hide: function () {
        this.dialog.style.display='none';
    }
};

window.onload = function () {
    var dialog = new Dialog();

    $(".show-dialog").addEventListener("click", function () {
        dialog.show();
    },false);
};