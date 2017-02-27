
function prompt() {
    
    var that = this;
    this.mainPrompt = document.createElement("div");
    
    this.showPrompt = function() {
        that.mainPrompt.style.display = "block";
    };

    this.hidePrompt = function() {
        that.mainPrompt.style.display = "none";
    };

    this.changePrompt = function() {
        that.mainPrompt.firstChild.style.marginTop = document.body.clientHeight * 0.4 + "px";
        that.mainPrompt.firstChild.style.marginBottom = document.body.clientHeight * 0.4 + "px";
        that.mainPrompt.firstChild.style.marginLeft = document.body.clientWidth * 0.3 + "px";
        that.mainPrompt.firstChild.style.marginRight = document.body.clientWidth * 0.3 + "px";
    };
    
    this.createPrompt = function() {
        var promptWindow = document.createElement("div");
        var promptHeader = document.createElement("div");
        var promptSure = document.createElement("p");
        var promptCancel = document.createElement("p");
        var promptBody = document.createElement("div");
        var promptTitle = document.createElement("p");
        promptSure.innerHTML = "完成";
        promptCancel.innerHTML = "取消";
        promptTitle.innerHTML = "这是弹出层";
        that.mainPrompt.setAttribute("class", "prompt");
        promptWindow.setAttribute("class", "prompt-window");
        promptHeader.setAttribute("class", "prompt-header");
        promptSure.setAttribute("class", "prompt-yes");
        promptCancel.setAttribute("class", "prompt-cancel");
        promptBody.setAttribute("class", "prompt-body");
        promptTitle.setAttribute("class", "prompt-title");
        promptHeader.appendChild(promptCancel);
        promptHeader.appendChild(promptSure);
        promptBody.appendChild(promptTitle);
        promptWindow.appendChild(promptHeader);
        promptWindow.appendChild(promptBody);
        that.mainPrompt.appendChild(promptWindow);
    };
    
    this.delegateEvent = function() {
        that.mainPrompt.onclick = function(e) {
            e = e || window.event;
            var tagChild = e.srcElement || e.target;
            if (!(tagChild.className == "prompt-header" || tagChild.className == "prompt-body" || tagChild.className == "prompt-title")) {
                that.hidePrompt();
            }
        }
        
    };
    
    this.init = function() {
        that.createPrompt();
        that.delegateEvent();
        that.changePrompt();
        that.showPrompt();
    }
    
}

window.onload = function() {
    addEvent($("#prompt-show"), "click", function() {
        var pro = new prompt();
        pro.init();
        document.body.insertBefore(pro.mainPrompt, document.body.firstChild);
        addEvent(window, "resize", pro.changePrompt);
    })
}