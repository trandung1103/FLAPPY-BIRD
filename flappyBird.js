var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/chim1.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 320;
var constant;

var bX = 10;
var bY = 150;

var gravity = 4;

var score = 0;
var dat=cvs.height-fg.height;

// audio files

// var fly = new Audio();
// var scor = new Audio();

// fly.src = "sounds/fly.mp3";
// scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("click",moveUp);

function moveUp(){
    bY -= 90;
    // fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        ctx.drawImage(fg,0,cvs.height - fg.height);
        ctx.fillStyle = "#000";
        ctx.font = "50px Ink Free";
        ctx.fillText("Score : "+score,10,cvs.height-20);
        // ctx.fillText("Restart",10,20);
        ctx.drawImage(bird,bX,bY);

             
        pipe[i].x-=5;
        
        if( pipe[i].x == 0 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        if(bY+bird.height>=cvs.height || bX+bird.width>= pipe[i].x && bX <= pipe[i].x +pipeNorth.width && (bY<=pipe[i].y+pipeNorth.height || bY +bird.height>= pipe[i].y+ constant)  )
        {
            location.stop();
        } 
        // if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bX + bird.height ==  cvs.height - fg.height){
        //     location.reload(); // reload the page
        // }
        
        if(pipe[i].x == (bX+bird.width)*5-700){
            score++;
            // scor.play();
        }
        
        
    }



    
    bY += gravity;
    

    
    requestAnimationFrame(draw);
    
}

draw();
