var STOP = 0;
var START = 1;

function spaceShip(orbit, driverType, energyType) {
    var obj = {
        _status: STOP,   //current state
        _energy: 100,    //current energy
        _destroyed: false,   //if the spaceShip is destroyed
        _velocity: driverModel[driverType].velo,    //spaceship's velocity 
        _consume: driverModel[driverType].consume,
        _charge: energyModel[energyType].energy,
        _angle: 0,       //rotate angle
        _orbit: orbit,
        
        //self-destroy system
        destroy: {
            destroy: function() {
                obj._destroyed = true;
            }
        },
        
        //drive system
        drive: {
            start: function() {
                if (obj._energy > 0) {
                    obj._status = START;
                }
            },
            
            stop: function() {
                obj._status = STOP;
            },
            
            fly: function() {
                if (obj._status == START) {
                    obj._angle += obj._velocity;
                }
                obj._angle = obj._angle % 360;
            }
        },
        
        //energy system
        energy: {
            add: function() {
                obj._energy += obj._charge;
                if (obj._energy > 100) {
                    obj._energy = 100;
                }
            },
            
            consume: function() {
                if (obj._status == START) {
                    obj._energy -= obj._consume;
                }
                if (obj._energy <= 0) {
                    obj._status = STOP;
                    obj._energy = 0;
                }
            },
            
            get: function() {
                return obj._energy;
            }
        },
        
        //signal system
        telegraph: {
            sendMessage: function(message) {
                var decoder = spaceManager.BUS.Adapter.decode(message);
                if (decoder.message.id == obj._orbit) {
                    switch(decoder.message.command) {
                        case 'start': 
                            obj.drive.start();
                            break;
                        case 'stop':
                            obj.drive.stop();
                            break;
                        case 'destroy':
                            obj.destroy.destroy();
                            break;
                    }
                }
            },
            
            sendStatus: function() {
                spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encode('captain', {
                    id: obj._orbit,
                    command: 'broadcast',
                    status: obj._status,
                    energy: obj._energy,
                    driverModel: driverType,
                    energyModel: energyType
                }))
            }
        }
    }
    return obj;
}