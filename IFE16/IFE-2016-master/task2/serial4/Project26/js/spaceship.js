var STOP = 0;
var START = 1;

function spaceShip(orbit) {
    var obj = {
        _status: STOP,   //current state
        _energy: 100,    //current energy
        _destroyed: false,   //if the spaceShip is destroyed
        _velocity: 1,    //spaceship's velocity    
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
            add: function(num) {
                obj._energy += num;
                if (obj._energy > 100) {
                    obj._energy = 100;
                }
            },
            
            consume: function(num) {
                if (obj._status == START) {
                    obj._energy -= num;
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
                if (message.orbitId == obj._orbit) {
                    switch(message.command) {
                        case 'start': 
                            obj.drive.start();
                            break;
                        case 'stop':
                            obj.drive.stop();
                            break;
                        case 'velo':
                            obj._velocity = message.value;
                            break;
                        case 'destroy':
                            obj.destroy.destroy();
                            break;
                    }
                }
            }
        }
    }
    return obj;
}