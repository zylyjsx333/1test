var lines = document.getElementsByTagName("li");

function Position(x, y, lastPOS){  
    this.X = x;  
    this.Y = y;  
    this.LastPOS = lastPOS;  
}  

Position.prototype.validate = function(curPos, queue, closedQ) {
    if (curPos.X >= 0 && curPos.X <= 9 && curPos.Y >= 0 && curPos.Y <= 9 && (lines[curPos.Y+10]).childNodes[curPos.X].className == "" && !queue.has(curPos) && !closedQ.has(curPos)) {
        return true;
    }
    return false;
}

Position.prototype.Up = function(queue,closedQ) {
    var cur = new Position(this.X, this.Y - 1);
    if (this.validate(cur, queue, closedQ)) {
        cur.LastPOS = this;
        return cur;
    }
    return undefined;
}


Position.prototype.Down = function(queue,closedQ) {
    var cur = new Position(this.X, this.Y + 1);
    if (this.validate(cur, queue, closedQ)) {
        cur.LastPOS = this;
        return cur;
    }
    return undefined;
}

Position.prototype.Left = function(queue,closedQ) {
    var cur = new Position(this.X - 1, this.Y);
    if (this.validate(cur, queue, closedQ)) {
        cur.LastPOS = this;
        return cur;
    }
    return undefined;
}

Position.prototype.Right = function(queue,closedQ) {
    var cur = new Position(this.X + 1, this.Y);
    if (this.validate(cur, queue, closedQ)) {
        cur.LastPOS = this;
        return cur;
    }
    return undefined;
}

function Queue(startPos) {
    var that = this;
    var list = [];
    
    this.length = function() {
        return list.length;
    }
    
    this.push = function(position) {
        if(startPos.constructor.name == "Position"){ 
            list.push(position);  
        }
        return that;
    }
    
    this.pop = function(){  
        return list.pop();  
    }
    
    this.top = function(){  
        return list.shift();  
    }
    
    this.has = function(position){  
        for(var i = 0, len = list.length; i < len; i++){  
            if(list[i].X == position.X && list[i].Y == position.Y){  
                return true;  
            }
        }
        return false;  
    }
    
    this.Item = list;
}

function BFS(startCoord, endCoord) {
    var startPos = new Position(startCoord[0], startCoord[1], null);
    var endPos = new Position(parseInt(endCoord[0]) - 1, parseInt(endCoord[1]) - 1, null);
    var openQ = new Queue(startPos), closedQ = new Queue(startPos);
    var found = false;
    var count = 0;    
    openQ.push(startPos);
    while(!found && openQ.length() && count <= 100) {
        count++;
        var pos = openQ.top();
        closedQ.push(pos);
        if (pos.X == endPos.X && pos.Y == endPos.Y) {
            found = true;
        }
        else {
            var down = pos.Down(openQ, closedQ);  
            var right = pos.Right(openQ, closedQ);  
            var up = pos.Up(openQ, closedQ);  
            var left = pos.Left(openQ, closedQ);  
              
            if(down) openQ.push(down);  
            if(right) openQ.push(right);  
            if(up) openQ.push(up);  
            if(left) openQ.push(left);  
        }
    }
    
    if (found) {
        outputResult(closedQ, startPos);
    }
    else {
        alert("找不到可行的路径！");
    }
}

function outputResult(closedQ, startPos) {
    var path = [];
    var pathLength = 0;    
    var lastPOS = closedQ.pop();  
    while(lastPOS.X != startPos.X || lastPOS.Y != startPos.Y){  
        path.push(lastPOS);  
        lastPOS = lastPOS.LastPOS;  
        pathLength++;  
    }  
    console.log(path[0]);
    var timer1 = window.setInterval(function(){  
        var point = path.pop();  
        if (point) {
            var diff = [(point.X - startPos.X), (point.Y - startPos.Y)];
            switch(diff.join(' ')) {
                case ('1 0'): command.commandMovRig(); break;
                case ('-1 0'): command.commandMovLef(); break;
                case ('0 1'): command.commandMovBac(); break;
                case ('0 -1'): command.commandMovTop(); break;
            }
            startPos = point;
        }
        else clearInterval(timer1);  
    },200);
}