// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener, isCorrect) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, isCorrect);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}


var validate = {
    //将name中的所有中文字符替换（1中文字符长度=2英文字符长度）
    nameVali: function (str) {
        var chineseRegex = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
        var lenRegex = /^.{4,16}$/;
        if (str.length == 0) {
            return false;
        }
        else if (!lenRegex.test(str)) {
            return false
        }
        else {
            return true;
        }
    },
    
    //密码验证
    passwordVali: function (str) {
        return (str.length >= 8 && str.length<= 20);
    },
    
    //再次输入的密码验证
    repasswordVali: function (str, id) {
        var password = document.querySelector("#" + id).value;
        return (str === password);
    },
    
    // 判断是否为邮箱地址
    // 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
    // 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
    // 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
    emailVali: function (str) {
        var regex = /^([\w-*\.*]+)@([\w-]+)((\.[\w-]{2,4}){1,2})$/;
        return regex.test(str);
    },
    
    // 判断是否为手机号
    telephoneVali: function (str) {
        var regex = /^1[0-9]{10}$/;
        return regex.test(str);
    },
    
    allVali: function () {
        var inputArray = document.querySelectorAll("input");
        var count = 0;
        for (var cur = 0; cur < inputArray.length; cur++) {
            if (inputArray[cur].className == "correctInput") {
                count++;
            }
        }
        return (count === inputArray.length);
    }
    
}

function formFactory(data) {
    var whole = {
        settings: {
            label: data.label,
            name: data.name,
            type: data.type,
            validator: data.validator,
            rules: data.rules,
            success: data.success,
            empty: data.empty,
            fail: data.fail
        },
        
        generateInput: function(type) {
            var that = this;
            var container = document.getElementById("father");
            var span = document.createElement("span");
            span.innerText = that.settings.label;
            var p = document.createElement("p");
            p.className = "status";
            var label = document.createElement("label");
            
            var input = document.createElement("input");
            input.name = that.settings.name;
            input.type = that.settings.type;
            input.id = that.settings.name;
            
            addEvent(input, "focus", function() {
                input.className = "inputFocus";
                p.innerText = that.settings.rules;
            }, true);
            addEvent(input, "blur", function() {
                var verify = "";
                if (type == "single") {
                    verify = that.settings.validator(this.value);
                }
                else if (type == "verify") {
                    verify = that.settings.validator(this.value) && (this.value.length != 0);
                }
                
                if (verify) {
                    input.className = "correctInput";
                    p.className = "status correctSta";
                    p.innerText = that.settings.success;
                }
                else {
                    input.className = "wrongInput";
                    p.className = "status wrongSta";
                    if (this.value.length == 0) {
                        p.innerText = that.settings.empty;
                    }
                    else p.innerText = that.settings.fail;
                }
            }, true);
            
            container.appendChild(label);
            label.appendChild(span);
            label.appendChild(input);
            container.appendChild(p);
        },
        
        generateButton: function() {
            var that = this;
            var container = document.getElementById("father");
            var button = document.createElement("button");
            button.innerHTML = that.settings.label;
            
            addEvent(button, "click", function() {
                if (that.settings.validator()) {
                    alert("提交成功!");
                }
                else alert("提交失败!");
            }, false);
            container.appendChild(button);
        },
        
        init: function() {
            var that = this;
            //判断类型
            switch (that.settings.name) {
                case 'name':
                    that.generateInput('single');
                    break;
                case 'password':
                    that.generateInput('single');
                    break;
                case 'repassword':
                    that.generateInput('verify');
                    break;
                case 'email':
                    that.generateInput('single');
                    break;
                case 'telephone':
                    that.generateInput('single');
                    break;
                case 'submit':
                    that.generateButton();
                    break;
            }
        }
    }
    return whole.init();
}

window.onload = function() {
    for (var i = 0; i < data.length; i++) {
        formFactory(data[i]);
    }
}