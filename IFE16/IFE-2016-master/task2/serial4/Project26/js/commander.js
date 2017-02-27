var commander = {
    
    // record state of four orbits
    record: {
        orbitStatus: [false, false, false, false]
    },
    
    createSpaceship: function(id) {
        if (this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上已经存在飞船！", "blue");
            return;
        }
        this.record.orbitStatus[id] = true;
        log("在轨道" + (id + 1) + "上创建飞船！", "yellow");
        spaceManager.Mediator.createSpaceship(id);
    },
    
    start: function(id) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (id + 1) + "发送开始飞行指令！", "yellow");
        spaceManager.Mediator.sendMessage({
            orbitId: id,
            command: 'start'
        });
    },
    
    stop: function(id) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (id + 1) + "发送停止飞行指令！", "yellow");
        spaceManager.Mediator.sendMessage({
            orbitId: id,
            command: 'stop'
        });
    },
    
    destroy: function(id) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        this.record.orbitStatus[id] = false;
        log("向轨道" + (id + 1) + "发送飞船自爆指令！", "yellow");
        spaceManager.Mediator.sendMessage({
            orbitId: id,
            command: 'destroy'
        });
    },
    
    setVelo: function(id, velocity) {
        if (!this.record.orbitStatus[id]) {
            log("轨道" + (id + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (id + 1) + "发送设置速度指令！", "yellow");
        spaceManager.Mediator.sendMessage({
            orbitId: id,
            command: 'velo',
            value: velocity
        });
    }
}