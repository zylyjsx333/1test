// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}

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

window.onload = function() {
    //相关的正则表达式，用来验证中文字符和字符串长度
    var chineseRegex = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
    var lenRegex = /^.{4,16}$/;
    
    function validate() {
        var inputBox = document.getElementById("form-input");
        var input = trim(inputBox.value);
        var handledInput = input.replace(chineseRegex, "00");
        console.log(handledInput);
        var outputNode = document.getElementById("status");
        outputNode.style.color = "green";
        var outputMessage;
        inputBox.style.border = "2px solid #a8a8a8";
        if (handledInput.length === 0) {
            outputMessage = "姓名不能为空";
            outputNode.style.color = "red";
            inputBox.style.border = "2px solid red";
        }
        else if (!lenRegex.test(handledInput)) {
            outputMessage = "长度为4~16个字符";
            outputNode.style.color = "red";
            inputBox.style.border = "2px solid red";
        }
        else {
            outputMessage = "名称格式正确";
            inputBox.style.border = "2px solid green";
        }
        outputNode.innerHTML = outputMessage;
    }
    
    addEvent(document.getElementById("form-post"), "click", validate);
}