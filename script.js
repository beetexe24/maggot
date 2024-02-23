

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var ctxWidth = canvas.width;
var ctxHeight = canvas.height;


var balls = [];
var randomDirection = 0;

var range = 7;

function newball(x, y, vx, vy, radius, totalX, totalY){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.totalX = totalX;
	this.totalY = totalY;
}

var direction = 1;
var direction2 = 1;
var radianX = [];
var radianY = [];
var delay = 0.4;
var delayReducer = 2.5;


function animate(){
	ctx.fillStyle = 'rgba(0,0,0,0.05)';
	ctx.fillRect(0,0,canvas.width * 4, canvas.height * 4);


mainMovement();

	

	drawBall();
	requestAnimationFrame(animate);
}





function randomRange(){
	range = Math.floor((Math.random() * 7) + 1);
}


setInterval(function(){
randomRange();

}, 1000);

var getButton = document.getElementById('addX');

function mainMovement(){

	
	
	for(var i = 0; i < balls.length; i++){
		
		balls[i].totalX += radianX[i];
		balls[i].totalY += radianY[i];

		//WALL COLLISION
		if (balls[i].y < 1){
			balls[i].y = canvas.height/2;
		} else if (balls[i].y > canvas.height){
			balls[i].y = canvas.height / 2;
		} else if (balls[i].x > canvas.width){
			balls[i].x = canvas.width / 2;
		}
		 else if (balls[i].x < 1){
			balls[i].x = canvas.width / 2;
		}else{
			//DO MOVEMENT
			doMovement(i);
		}
	
		
	}

}


function doMovement(counter){
		if(range == 1){
			curveRightToLeft(counter);
		} 
		if(range == 2){
			curveLeftToRight(counter);
		} 
		if(range == 3){
			move1(counter);
			range = 1;
		} 
		if(range == 4){
			move2(counter);
			range = 2;
		} 
		if(range == 5){
			move3(counter);
			range = 2;
		} 
		if(range == 6){
			move4(counter);
			range = 1;
		} 
		if(range == 7){
			move5(counter);	
			range = 1;
		} 	
}

getButton.addEventListener("click", function(e){

	
});

function shapesAtEdge(counter){
	


}



/** RUN CURVE **/
function curveRightToLeft(counter){
	balls[counter].x += Math.sin(balls[counter].totalX) * delay;
	balls[counter].y += Math.cos(balls[counter].totalY) * delay;
}

function curveLeftToRight(counter){
	balls[counter].x += Math.cos(balls[counter].totalX) * delay;
	balls[counter].y -= Math.sin(balls[counter].totalX) * delay;
}



/** RUN STRAIGHT **/

function move1(counter){
	//balls[counter].x += radianX[counter] + 0.05 * 10;
	//balls[counter].y += radianY[counter] + 0.05 * 5;
	balls[counter].x += Math.sin(balls[counter].totalX) * delay;
	balls[counter].y -= Math.sin(balls[counter].totalY) * delay;
}

function move2(counter){
	//balls[counter].x += radianX[counter] + 0.05 * 10;
	//balls[counter].y += radianY[counter] + 0.05 * 5;
	balls[counter].x -= Math.sin(balls[counter].totalX) * delay;
	balls[counter].y -= Math.sin(balls[counter].totalY) * delay;
}

function move2(counter){
	//balls[counter].x += radianX[counter] + 0.05 * 10;
	//balls[counter].y += radianY[counter] + 0.05 * 5;
	balls[counter].x += balls[counter].totalX * delay;
	balls[counter].y -= Math.sin(balls[counter].totalY) * delay;
}

function move3(counter){
	//balls[counter].x += radianX[counter] + 0.05 * 10;
	//balls[counter].y += radianY[counter] + 0.05 * 5;
	balls[counter].x -= balls[counter].totalX * delay;
	balls[counter].y += Math.sin(balls[counter].totalY) * delay;
}

function move4(counter){
	//balls[counter].x += radianX[counter] + 0.05 * 10;
	//balls[counter].y += radianY[counter] + 0.05 * 5;
	balls[counter].x -= Math.sin(balls[counter].totalX) * delay;
	balls[counter].y += balls[counter].totalY * delay;
}

function move5(counter){
	//balls[counter].x += radianX[counter] + 0.05 * 10;
	//balls[counter].y += radianY[counter] + 0.05 * 5;
	balls[counter].x -= Math.cos(balls[counter].totalX) * delay;
	balls[counter].y -= balls[counter].totalY * delay;
}



function createball(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	for(var i =0; i < 500; i++){
		var randomX = Math.floor((Math.random() * canvas.width * 4) + 100);
		var randomY = Math.floor((Math.random() * canvas.height * 4) + 100);
		var randomVX = Math.floor((Math.random() * 5) + 1) / 100;
		var randomVY = Math.floor((Math.random() * 5) + 1) / 100;
		var radius = 1;
		var totalX = 0;
		var totalY = 0;
		var create = new newball(randomX, randomY, randomVX, randomVY, radius, totalX, totalY);
		balls.push(create);
	}

}

function getEachSpeed(){
	for(var i = 0; i < balls.length; i++){
		radianX.push(balls[i].vx);
		radianY.push(balls[i].vy);
	}
}

createball();
getEachSpeed();

function drawBall(){

	for(var i=0; i < balls.length; i++){
		var getBall = balls[i];
		ctx.beginPath();
		ctx.arc(getBall.x, getBall.y, getBall.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		if (i % 2){
			ctx.fillStyle = '#FF8000';
		} else{
			ctx.fillStyle = '#0080B6';
		}
		
		ctx.fill();
	}
}

resizeCanvasToDisplaySize(ctx.canvas);

function resizeCanvasToDisplaySize(canvas) {
   // look up the size the canvas is being displayed
   const width = canvas.clientWidth;
   const height = canvas.clientHeight;

   // If it's resolution does not match change it
   if (canvas.width !== width || canvas.height !== height) {
     canvas.width = width;
     canvas.height = height;
     return true;
   }

   return false;
}



requestAnimationFrame(animate);
