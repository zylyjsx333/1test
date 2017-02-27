window.onload = function(){
    var check = document.getElementsByTagName("button")[0];
    var hint = document.getElementsByClassName("hint")[0];
    check.onclick = function(){
        var input = document.getElementsByTagName("input")[0];
        if(input.value==""){
            input.style.border = "2px solid #DA000E";
            hint.style.color = "#DA000E";
            hint.innerText = "姓名不能为空";
        }else if(input.value.length<4||input.value.length>16){
            input.style.border = "2px solid #DA000E";
            hint.style.color = "#DA000E";
            hint.innerText = "输入长度为4~16个字符";
        }else{
            input.style.border = "2px solid #67B752";
            hint.style.color = "#67B752";
            hint.innerText = "名称格式正确";
        }
        return false;
    };
};