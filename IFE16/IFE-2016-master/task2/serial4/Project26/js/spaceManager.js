var spaceManager = {
    record: {
        spaceShipList: [],
        spaceShipFlyManager: 0,
        solarManager: 0
    },
    
    createSpaceship: function(id) {
        var shipId = this.record.spaceShipList.push(new spaceShip(id));
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
    Mediator: {
        sendMessage: function(message) {
            setTimeout(function() {
                if(Math.random() <= 0.3) {
                    log("向轨道" + (message.orbitId + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (message.orbitId + 1) + "发送 " + message.command + " 指令成功！", "green");
                for (var cur = 0; cur < spaceManager.record.spaceShipList.length; cur++) {
                    if (spaceManager.record.spaceShipList[cur]._destroyed) {
                        continue;
                    }
                    spaceManager.record.spaceShipList[cur].telegraph.sendMessage(message);
                }
            }, 1000);
        },
        
        createSpaceship: function(id) {
            setTimeout(function() {
                if(Math.random() <= 0.3) {
                    log("向轨道" + (id + 1) + "发送的 create 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (id + 1) + "发送 create 指令成功！", "green");
                spaceManager.createSpaceship(id);
            }, 1000);
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
                    spaceManager.record.spaceShipList.splice(cur, 1);
                    console.log(spaceManager.record.spaceShipList);
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
            spaceManager.record.spaceShipList[i].energy.add(2);
            spaceManager.record.spaceShipList[i].energy.consume(5);
        }
    }, 1000);
})();