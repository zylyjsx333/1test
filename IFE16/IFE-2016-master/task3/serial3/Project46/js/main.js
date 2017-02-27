var gameCanvas = document.getElementById("game");
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;

if (clientWidth >= 600) {
    gameCanvas.width = 600;
    gameCanvas.height = 800;
}
else {
    gameCanvas.width = clientWidth;
    gameCanvas.height = clientHeight;
}

var blockSize = gameCanvas.width / 15;
var hero = {
    speed: 50,		
    x: 7,
    y: 0
};
var sDoc = {		
    x: 7,
    y: parseInt(gameCanvas.height / gameCanvas.width * 15) - 1
};

var openlist = [];
var closelist = [];
var blockedList = [];
var father = [];
var row = gameCanvas.height / blockSize;
var col = gameCanvas.width / blockSize;	
if (gameCanvas.getContext){
    var mainGame = gameCanvas.getContext('2d');	          
    setStart();	
    resetGame();          	 		  			  
}

function rectRandom(r) {
    var xPos,yPos;

    function randomPos(){
        xPos = parseInt(Math.random() * 15);
        yPos = parseInt(Math.random() * (sDoc.y + 1));
        if((xPos == hero.x && yPos == hero.y )||(xPos == sDoc.x && yPos == sDoc.y)) {
            randomPos();
            return [xPos, yPos];
        }
        else {
            return [xPos, yPos];
        }
    }
 		
    function rectBlock(r){ 		
        var pos = randomPos();
        blockedList.push(pos);
        if (gameCanvas.getContext){
            mainGame.fillStyle = "#493C2D";
            mainGame.fillRect(pos[0] * r, pos[1] * r, r, r);
        }	
    }

    var rectNum = parseInt(Math.random() * 50 + 50);
    for(var i = 0; i < rectNum; i++) {
        rectBlock(r);
    }
}

/* create spy */
function heroSet(x, y) {
    mainGame.fillStyle = "#90DF97";
    mainGame.beginPath();
    mainGame.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    mainGame.fill();
}

/* create doc */
function docSet() {
    mainGame.fillStyle = "#F4AE8A";
    mainGame.beginPath();
    mainGame.moveTo(sDoc.x * blockSize + blockSize / 2, (sDoc.y + 1) * blockSize);
    mainGame.lineTo(sDoc.x * blockSize, sDoc.y * blockSize);
    mainGame.lineTo((sDoc.x + 1) * blockSize, sDoc.y * blockSize);
    mainGame.fill();
}

/* reset game */
function resetGame(){
    mainGame.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    rectRandom(blockSize);
    heroSet(hero.x, hero.y);
    docSet();
}

/* find path algorithm */
var start = [];
var end = [];
var rh = 10, ch = 10, rch = 14;

function isOutScreen(pos){
    return (pos[0] < 0 || pos[1] < 0 || pos[0] > col-1 || pos[1] > row-1) ? true : false;
}

function isInCloselist(pos){
    for(var i = 0; i < closelist.length; i++) {
        if(pos[0] == closelist[i][0] && pos[1] == closelist[i][1]) {
            return true;
            break;
        }
    }
    return false;
}

function isBlockList(pos){
    for(var i = 0; i < blockedList.length; i++) {
        if(pos[0] == blockedList[i][0] && pos[1] == blockedList[i][1]) {
            return true;
            break;
        }
    }
    return false;
}

function sortF(arr){
    openlist = arr.sort(function(a, b){
        return b[2] - a[2];
    });
}

function isStart(pos, start){
    return (pos[0] == start[0] && pos[1] == start[1]) ? true : false;	  	
} 

function getAround(pos){
    var around = [];
    around.push([pos[0] + 1, pos[1] - 1]);
    around.push([pos[0] + 1, pos[1]]);
    around.push([pos[0] + 1, pos[1] + 1]);
    around.push([pos[0], pos[1] + 1]);
    around.push([pos[0] - 1, pos[1] + 1]);
    around.push([pos[0] - 1, pos[1]]);
    around.push([pos[0] - 1, pos[1] - 1]);
    around.push([pos[0], pos[1] - 1]);
    return around;
}

function getF(arr, start, end){
    var G, H, F;
    openlist = [];
     
    for(var i = 0; i< arr.length; i++){

        if(isOutScreen(arr[i]) || isBlockList(arr[i]) || isInCloselist(arr[i]) || isStart(arr[i],start)) {
            continue;
        }
        
        var each = new Array(5);		    		    
        if((arr[i][0] - father[0]) * (arr[i][1] - father[1]) != 0) {
            G = rch;
        }
        else {
            G = rh;
        }
        H = Math.abs(end[0] - arr[i][0]) * rh + Math.abs(end[1] - arr[i][1]) * ch;
        F = G + H;		    
            
        each[0] = arr[i][0];
        each[1] = arr[i][1];		    
        each[2] = F;
        each[3] = father[0];
        each[4] = father[1];
        openlist.push(each);		    
    }

}

function clearPath(x,y){
    mainGame.clearRect(x * blockSize, y * blockSize, blockSize, blockSize);
}
	
function setStart(){
    openlist = [];
    closelist = [];
    blockedList = [];
    father = [];
    father = [hero.x, hero.y, 0, 0, 0];
    closelist.push([hero.x, hero.y, 0, 0, 0]);
}

function findMain(){

    if(end[0] == closelist[closelist.length - 1][0] && end[1] == closelist[closelist.length - 1][1]) {
        alert("起点和终点相同！");
    }
    else {
        
        getF(getAround(father), [closelist[closelist.length - 1][0], closelist[closelist.length - 1][1]], end);
        sortF(openlist);
        father = openlist[openlist.length - 1];
        closelist[closelist.length] = openlist[openlist.length - 1];
        clearPath(closelist[closelist.length - 2][0], closelist[closelist.length - 2][1]);
        heroSet(closelist[closelist.length - 1][0], closelist[closelist.length - 1][1]);
         
         
        if(openlist.length == 0) {
            alert("找不到路径");
            return;
        }

        if(( sDoc.x == father[0]) && (sDoc.y == father[1])) {
            setStart();
            resetGame();	
            return;		      	 

        }

        if(!((father[0] == end[0]) && (father[1] == end[1]))) {
            setTimeout("findMain()", hero.speed);
        }
    }		 
}

function windowTocanvas(canvas, x, y) {
    var box = canvas.getBoundingClientRect();
    return {
        x: x - box.left, 
        y: y - box.top 
    };
}
   
gameCanvas.onclick = function(event){
        
    var loc = windowTocanvas(gameCanvas, event.clientX, event.clientY)
    var x = parseInt(loc.x);
    var y = parseInt(loc.y);

    var arrayX = [];
    var arrayY = [];

    for(var i = 0; i <= 15; i++) {
        arrayX.push(blockSize * i);
    }
    
    for(var i = 0; i <= (sDoc.y + 1); i++) {
        arrayY.push(blockSize * i);
    }

    function find(array, val) {
        
        var idx = 0, i = 0, j = array.length;
        for(; i<j; i++){
            if(array[i] >= val) {
                idx = i;
                break;
            };
        };
        return idx - 1;
    }

    if(isBlockList([find(arrayX, x), find(arrayY, y)])) {
        alert("特工不能到达障碍物！")
    }
    else {
        
        openlist = [];
        closelist.splice(0, closelist.length - 1);
        end = [find(arrayX, x), find(arrayY, y)];
        findMain();	    	
    }    
}