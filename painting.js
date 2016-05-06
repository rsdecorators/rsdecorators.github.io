var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
        
var colours = ["#E4B6E4","#8AC2D4","#9ABD9A"];
var darkerColours = ["#D0A2D0","#71A2B4","#7A9D7A"];
var paintColour = colours[0];
var darkerPaintColour = function(){
    return darkerColours[colours.indexOf(paintColour)];
}

function iterateColour(){
    paintColour = colours[(colours.indexOf(paintColour) + 1) % colours.length];
}
        
var animationStates = {
    COUNTING:"counting",
    PAINTING:"painting",
    POSTCOUNTING:"postcounting",
    CLEARING:"clearing"
}
        
var animationState = animationStates.COUNTING;

var counter = 0;

var canvasDivisions = Math.floor(canvas.width / 300) + 2;
var divisionWidth = canvas.width / canvasDivisions;
var paintSpeedDivisions = 100;
var totalCountNeeded = canvasDivisions * paintSpeedDivisions;
        
var resized = true;
function setCanvasSize(){
    if(resized){
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        resized = false;
        
        canvasDivisions = Math.floor(canvas.width / 300) + 2;
        divisionWidth = canvas.width / canvasDivisions;
        paintSpeedDivisions = 100;
        totalCountNeeded = canvasDivisions * paintSpeedDivisions;
    }
}

window.onresize = function(){
    resized = true;
}
        
function draw(){
                       
    setCanvasSize();
            
    switch(animationState){
        case animationStates.PAINTING:
            paint();
            break;
        case animationStates.COUNTING:
            count();
            break;
        case animationStates.POSTCOUNTING:
            postCount();
            break;
        case animationStates.CLEARING:
            clear();
            break;
        default:
            break;
    }
            
    window.requestAnimationFrame(draw);
}   

var clearSpace = {x:0,y:0,w:0,h:0};

function paint(){
    counter+=2;   
    
    if(counter > totalCountNeeded + 2){
        counter = 0;
        animationState = animationStates.POSTCOUNTING;
        return;
    }    
    
    var cmodpsd = (counter % paintSpeedDivisions)
    
    ctx.clearRect(clearSpace.x, clearSpace.y, clearSpace.w, clearSpace.h);
    
    for(var i = 0; i < canvasDivisions; i++){
        var paintHeight = canvas.height * cmodpsd / paintSpeedDivisions;
        
        if(counter > (i+1) * paintSpeedDivisions){
            continue;
        }
        
        if(counter < (i) * paintSpeedDivisions){
            paintHeight = 0;
        }
      
        drawBrush(i * divisionWidth, paintHeight, divisionWidth);
    }
    
}

function drawBrush(x, y, w){
    ctx.beginPath();
    ctx.fillStyle = paintColour;
    ctx.rect(x,0,w,y);
    ctx.fill();
    ctx.closePath();
    
    if(y > 0){
        var rollWidth = 40;
        ctx.beginPath();
        ctx.rect(x,y,w,rollWidth);
        ctx.fillStyle=darkerPaintColour();
        ctx.lineWidth=8;
        ctx.fill();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(x + w, y + rollWidth / 2);
        ctx.bezierCurveTo(x + w + rollWidth/ 2, y + rollWidth / 2, x + w + rollWidth / 2, y + rollWidth * 3 / 2,  x + w, y + rollWidth * 3 / 2);
        ctx.bezierCurveTo(x + w / 2, y + rollWidth * 3 / 2,x + w / 2, y + rollWidth * 3 / 2, x + w / 2, y + rollWidth * 3);
        
        ctx.strokeStyle="grey";
        ctx.stroke();
        
        ctx.beginPath();
        ctx.rect(x + w / 2 - 7, y + rollWidth * 3, 14, 2 * rollWidth);
        
        ctx.strokeStyle="black";
        ctx.lineWidth="2";
        ctx.stroke();
        ctx.fill();
        
        clearSpace={x:x,y:y,w:2 * w,h:rollWidth * 6};
    }
}

function count(){
    counter++;
    if(counter > 100){
        counter = 0;
        animationState = animationStates.PAINTING;
    }
    
}

function postCount(){
    counter++;
    if(counter > 50){
        counter = 0;
        animationState = animationStates.CLEARING;
    }
}

function clear(){
    counter+=5+counter/50;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(counter > 500){
        counter = 0;
        animationState = animationStates.COUNTING;
        iterateColour();
        return;
    }   
    
    var width = canvas.width * counter / 250;
    var height = canvas.height * counter / 250;
    
    ctx.beginPath();
    ctx.moveTo(canvas.width * 2, canvas.height * 2); 
    ctx.lineTo(canvas.width * 2, 0);    
    ctx.lineTo(width,0);
    ctx.lineTo(0,height);
    ctx.lineTo(0, canvas.height * 2);
    ctx.lineTo(canvas.width * 2, canvas.height * 2); 
    ctx.fillStyle = paintColour;
    ctx.fill();
    ctx.closePath();
}
        
draw(); 