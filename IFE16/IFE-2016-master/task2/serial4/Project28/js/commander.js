var commander = {
    
    // record state of four orbits
    record: {
        orbitStatus: [false, false, false, false]
    },
    
    createSpaceship: function(id, driverType, energyType) {
        if (this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上已经存在飞船！", "blue");
            return;
        }
        this.record.orbitStatus[id] = true;
        log("在轨道" + (id + 1) + "上创建飞船！", "yellow");
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encode(id, {
            command: "create",
            driver: driverType,
            energy: energyType
        }));
    },
    
    start: function(id) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (id + 1) + "发送开始飞行指令！", "yellow");
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encode(id, {
            command: 'start'
        }));
    },
    
    stop: function(id) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (id + 1) + "发送停止飞行指令！", "yellow");
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encode(id, {
            command: 'stop'
        }));
    },
    
    destroy: function(id) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        this.record.orbitStatus[id] = false;
        log("向轨道" + (id + 1) + "发送飞船自爆指令！", "yellow");
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encode(id, {
            command: 'destroy'
        }));
    },
    
    commandCenter: {
        Adapter: spaceManager.BUS.Adapter,
        message: function(message) {
            var decoder = this.Adapter.decode(message);
            if(decoder.receiver == '星球基地') {
                var record = document.getElementById("record-" + decoder.message.id);
                if (record == null) {
                    record = document.createElement("tr");
                    record.id = "record-" + decoder.message.id;
                    for(var i = 0; i < 5; i++) {
                        record.appendChild(document.createElement("td"));
                    }
                    document.getElementsByTagName("table")[0].appendChild(record);
                }
                var items = record.getElementsByTagName("td");
                items[0].innerHTML = "轨道" + (decoder.message.id + 1);
                items[1].innerHTML = driverModel[decoder.message.driverModel].model;
                items[2].innerHTML = energyModel[decoder.message.energyModel].model;
                items[3].innerHTML = decoder.message.status == STOP ? '停止' : '飞行';
                items[4].innerHTML = decoder.message.energy + "&#37;";
                //记录更新时间
                record.dataset.update = Date.now();
            }
        }
    }
};

(function() {
    setInterval(function() {
        var table = document.getElementsByTagName("table")[0];
        var records = table.getElementsByTagName("tr");
        var t = Date.now();
        for(var i = 0; i < records.length; i++) {
            if(!records[i].dataset.update) {
                continue;
            }
            //上次更新时间超过3秒删除记录，超过1秒标记为失联
            if(t - records[i].dataset.update > 3000) {
                table.removeChild(records[i]);
            } else if(t - records[i].dataset.update > 1000) {
                records[i].getElementsByTagName("td")[3].innerHTML = '失联';
            }
        }
    }, 1000);
})();