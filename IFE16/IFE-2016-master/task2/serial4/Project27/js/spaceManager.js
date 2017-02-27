var spaceManager = {
    record: {
        spaceShipList: [],
        spaceShipFlyManager: 0,
        solarManager: 0
    },
    
    createSpaceship: function(id, driver, energy) {
        var shipId = this.record.spaceShipList.push(new spaceShip(id, driver, energy));
        //create spaceship div
        var spaceShipDiv = document.createElement("div");
        spaceShipDiv.id = "spaceShip" + shipId;
        spaceShipDiv.className = "space-ship orbit-ship" + id;
        
        //create energy div
        var energyDiv = document.createElement("div");
        energyDiv.className = "energy";
        spaceShipDiv.appendChild(energyDiv);
        var textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.innerHTML = "100%";
        spaceShipDiv.appendChild(textDiv);
        
        document.body.appendChild(spaceShipDiv);
    },
    
    //send message to the spaceship    
    BUS: {
        sendMessage: function(message) {
            setTimeout(function() {
                var decoder = spaceManager.BUS.Adapter.decode(message);
                if (message.substr(0, 1) == 'r') {
                    message = message.substr(1);
                }
                if (Math.random <= 0.1) {
                    log("向轨道" + decoder.receiver + "发送的 " + decoder.message.command + " 指令丢包了！重试中...", "red");
                    spaceManager.BUS.sendMessage("r" + message);
                }
                if (decoder.retried) {
                    log("重试：向 " + decoder.receiver + " 发送 " + decoder.message.command + " 指令成功！", "greenYellow");
                } else {
                    log("向 " + decoder.receiver + " 发送 " + decoder.message.command + " 指令成功！", "green");
                }
                if (decoder.message.command == 'create') {
                    spaceManager.createSpaceship(decoder.message.id, decoder.message.driver, decoder.message.energy);
                } else {
                    for(var i = 0; i < spaceManager.record.spaceShipList.length; i++) {
                        if(spaceManager.record.spaceShipList[i]._destroyed) {
                            continue;
                        }
                        spaceManager.record.spaceShipList[i].telegraph.sendMessage(message);
                    }
                }
            }, 300);
        },
        
        Adapter: {
            encode: function(receiver, message) {
                var returnMsg = "";
                switch(receiver.toString()) {
                    case '0': returnMsg += '000'; break;
                    case '1': returnMsg += '001'; break;
                    case '2': returnMsg += '010'; break;
                    case '3': returnMsg += '100'; break;
                }
                switch(message.command) {
                    case 'create':
                        returnMsg += '00';
                        switch(message.driver) {
                            case 0: returnMsg += '00'; break;
                            case 1: returnMsg += '01'; break;
                            case 2: returnMsg += '10'; break;
                            case 3: returnMsg += '11'; break;
                        }
                        switch(message.energy) {
                            case 0: returnMsg += '00'; break;
                            case 1: returnMsg += '01'; break;
                            case 2: returnMsg += '10'; break;
                            case 3: returnMsg += '11'; break;
                        }
                        break;
                    case 'start': returnMsg += "01"; break;
                    case 'stop': returnMsg += "10"; break;
                    case 'destroy': returnMsg += "11"; break;    
                }
                return returnMsg;
            },
            
            decode: function(code) {
                if(code.length < 5 || (code.substr(0, 1) == 'r' && code.length < 6)) {
                    log("二进制码 " + code + " 解包出错！", "orange");
                    return {};
                }
                var returnMsg = {receiver: null, message: {}, retried: false};
                if(code.substr(0, 1) == 'r') {
                    returnMsg.retried = true;
                    code = code.substr(1);
                }
                switch(code.substr(0, 3)) {
                    case '000': returnMsg.receiver = '轨道1'; returnMsg.message.id = 0; break;
                    case '001': returnMsg.receiver = '轨道2'; returnMsg.message.id = 1; break;
                    case '010': returnMsg.receiver = '轨道3'; returnMsg.message.id = 2; break;
                    case '100': returnMsg.receiver = '轨道4'; returnMsg.message.id = 3; break;
                }
                switch(code.substr(3, 2)) {
                    case '00': 
                        returnMsg.message.command = 'create';
                        switch(code.substr(5, 2)) {
                            case '00': returnMsg.message.driver = 0; break;
                            case '01': returnMsg.message.driver = 1; break;
                            case '10': returnMsg.message.driver = 2; break;
                            case '11': returnMsg.message.driver = 3; break;
                        }
                        switch(code.substr(7, 2)) {
                            case '00': returnMsg.message.energy = 0; break;
                            case '01': returnMsg.message.energy = 1; break;
                            case '10': returnMsg.message.energy = 2; break;
                            case '11': returnMsg.message.energy = 3; break;
                        }
                        break;
                    case '01': returnMsg.message.command = 'start'; break;
                    case '10': returnMsg.message.command = 'stop'; break;
                    case '11': returnMsg.message.command = 'destroy'; break;
                }
                return returnMsg;
            }
        }
    }
};

//spaceship fly and display control..
(function() {
    spaceManager.record.spaceShipFlyManager = setInterval(function() {
        for (var cur = 0; cur < spaceManager.record.spaceShipList.length; cur++) {
            if (spaceManager.record.spaceShipList[cur]._destroyed) {
                if (!spaceManager.record.spaceShipList[cur].clear) {
                    spaceManager.record.spaceShipList[cur].clear = true;
                    document.body.removeChild(document.getElementById("spaceShip" + (cur + 1)));
                }
                continue;
            }
            spaceManager.record.spaceShipList[cur].drive.fly();
            var ship = document.getElementById("spaceShip" + (cur + 1));
            //coordinate of spaceship
            ship.style.webkitTransform = "rotate(" + spaceManager.record.spaceShipList[cur]._angle + "deg)";
            ship.style.mozTransform = "rotate(" + spaceManager.record.spaceShipList[cur]._angle + "deg)";
            ship.style.msTransform = "rotate(" + spaceManager.record.spaceShipList[cur]._angle + "deg)";
            ship.style.oTransform = "rotate(" + spaceManager.record.spaceShipList[cur]._angle + "deg)";
            ship.style.transform = "rotate(" + spaceManager.record.spaceShipList[cur]._angle + "deg)";
            //display of the energy
            ship.firstElementChild.style.width = spaceManager.record.spaceShipList[cur].energy.get() + "%";
            ship.lastElementChild.innerHTML = spaceManager.record.spaceShipList[cur].energy.get() + "%";
        }
    }, 100);
})();

//solar system to reboot the power of spaceship
(function() {
    spaceManager.record.solarManager = setInterval(function() {
        for(var i = 0; i < spaceManager.record.spaceShipList.length; i++) {
            if(spaceManager.record.spaceShipList[i]._destroyed) {
                continue;
            }
            spaceManager.record.spaceShipList[i].energy.add();
            spaceManager.record.spaceShipList[i].energy.consume();
        }
    }, 1000);
})();