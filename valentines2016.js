//Lovely tutorial on how to make games with HTML5 Canvas: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
//Thanks to that for helping me figure this out

//Setup menu animations
var animTime = 1000; //animation time for menu animations
$.fn.showUp = function()   { $(this).show("slide", { direction: "down" }, animTime); }
$.fn.hideDown = function() { $(this).hide("slide", { direction: "down" }, animTime); }
$.fn.hideUp = function()   { $(this).hide("slide", { direction: "up" }, animTime); }
$.fn.showDown = function() { $(this).show("slide", { direction: "up" }, animTime); }

var bgReady;
var backgroundImage = new Image();
backgroundImage.onload = function () {
	bgReady = true;
};
backgroundImage.src = "http://i.imgur.com/vwYBRko.png"

var heartImage = new Image();
heartImage.src = "heart.svg";

// Cross-browser support for requestAnimationFrame
var w = window;
var canvas;
var ctx;
var then;
var bgReady = false;
var playerReady = false;
var objectsArr = new Array();
var heartsCollected = 0;
var heartsGoal = 10;

var barLength = 0;
var barNorm = 150;

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var player = {
	speed: 200, //the movement speed in pixels per second
	x: 0,
	y: 0,
	width: 25,
	height: 25
};

function Item(type, x, y, width, height)
{
	this.type = type || "heart";
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 25;
	this.height = height || 25;
	this.opacity = 1;
	this.lifetime = 1;
	this.velx = 0;
	this.vely = 0;
	this.scale = 1;
	this.scaleSpeed = 0;
}

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function update(modifier)
{
	if ((38 in keysDown || 87 in keysDown) && player.y > 0) // Player holding up
	{
		player.y -=	player.speed * modifier;
	}
	if ((40 in keysDown || 83 in keysDown) && player.y < canvas.height - player.height) // Player holding down
	{ 
		player.y +=	player.speed * modifier;
	}
	if ((37 in keysDown || 65 in keysDown) && player.x > 0) // Player holding left
	{
		player.x -=	player.speed * modifier;
	}
	if ((39 in keysDown || 68 in keysDown) && player.x < canvas.width - player.width) // Player holding right
	{
		player.x +=	player.speed * modifier;
	}

	for(object in objectsArr) //check for collisions with all objects and apply physics
	{
		var obj = objectsArr[object];

		obj.x += obj.velx*modifier;
		obj.y += obj.vely*modifier;

		if(obj.type == "heart")
		{
			if(player.x <= (obj.x + obj.width)	&& obj.x <= (player.x + player.width)
				&& player.y <= (obj.y + obj.height) && obj.y <= (player.y + player.height) && obj.scaleSpeed == 0) //only collide if it's not shrinking
			{
				spawnParticles(obj.x, obj.y, "heartPickup");
				heartsCollected++;
				
				if(heartsCollected == heartsGoal)
					success();
				obj.scaleSpeed = -3;
				spawnHeart();
			}
		}
		else if(obj.type == "particle") //fade out particles
		{
			obj.opacity -= (1/obj.lifetime)*modifier;
			
			if(obj.opacity <= 0)
			{
				objectsArr.splice(object, 1);
			}
		}
		else if(obj.type == "ball")
		{
			if(player.x <= (obj.x + obj.width)	&& obj.x <= (player.x + player.width)
				&& player.y <= (obj.y + obj.height) && obj.y <= (player.y + player.height) && obj.scaleSpeed == 0) //only collide if it's not shrinking
			{
				playGame();
			}

			if((obj.x > canvas.width - obj.width && obj.velx > 0) || (obj.x < 0 && obj.velx < 0))
			{
				obj.velx = - obj.velx;
			}
			else if((obj.y > canvas.height - obj.height && obj.vely > 0) || (obj.y < 0 && obj.vely < 0))
			{
				obj.vely = - obj.vely;
			}
		}

		if(obj.scaleSpeed != 0) //it's shrinking!
		{
			obj.scale += obj.scaleSpeed * modifier;

			if(obj.scale < 0)
				objectsArr.splice(object, 1); //remove object by index
			if(obj.scale >= 1 && obj.type == "heart") //hearts don't overscale
				obj.scaleSpeed = 0;
		}
	}

	//Update hearts bar
	var barAmount = barNorm*(heartsCollected/heartsGoal);
	if(barAmount > barLength)
		barLength += 2*(barNorm/heartsGoal) * modifier;

	if(barLength > barNorm)
		barLength = barNorm;
}

// Draw everything
function render()
{
	if (bgReady)
	{
		ctx.drawImage(backgroundImage, 0, 0);
	}
	else
	{
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.fillRect(0,0,800,600);
	}

	if (playerReady)
	{
		ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
	}
	else
	{
		ctx.fillStyle = "rgb(250, 0, 0)";
		ctx.fillRect(player.x, player.y, player.width, player.height);	
	}

	for(object in objectsArr)
	{
		var obj = objectsArr[object];

		var practWidth = obj.width*obj.scale;
		var practHeight = obj.height*obj.scale;
		var widthDiff = (obj.width - practWidth)/2;
		var heightDiff = (obj.height - practHeight)/2;

		if(obj.type == "heart")
		{
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(obj.x+obj.width/2, obj.y+obj.height/2, practWidth/2, 0, 2*Math.PI);
			ctx.fill();
			ctx.drawImage(heartImage, obj.x+widthDiff+4, obj.y+heightDiff+5, practWidth-8, practHeight-8);
		}
		else if(obj.type == "particle")
		{
			ctx.fillStyle = "rgba(255,150,150," + obj.opacity + ")";
			ctx.beginPath();
			ctx.arc(obj.x+obj.width/2, obj.y+obj.height/2, practWidth/2, 0, 2*Math.PI);
			ctx.fill();
		}
		else
		{
			ctx.fillStyle = "rgba(255,255,255," + obj.opacity + ")";
			ctx.beginPath();
			ctx.arc(obj.x+obj.width/2, obj.y+obj.height/2, practWidth/2, 0, 2*Math.PI);
			ctx.fill();
		}
	}

	//Draw hearts bar

	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.fillRect(10, 10, barNorm + 35, 30); //draw the background
	ctx.fillStyle = "red";

	ctx.fillRect(10,10,barLength, 30);
	ctx.strokeStyle = "black";
	ctx.strokeRect(10, 10, barNorm, 30); //draw the border
	ctx.drawImage(heartImage, barNorm+15, 12, 25, 25);

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
};

function main() //the main action loop
{
	var now = Date.now(); //get the current time
	var delta = now - then; //calculate the time since last frame

	update(delta / 1000); //sends the time since the last frame. Seems similar to Unity's Time.deltaTime
	render(); //render the canvas

	then = now; //set the new time

	// Request to do this again ASAP
	requestAnimationFrame(main);
}

// Reset the game when
function reset()
{
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;
	objectsArr = []; //reset objects
	heartsCollected = 0; //and reset the collected hearts
	barLength = 0;
	spawnHeart();
	spawnBall();
}

//spawn a new heart pickup
function spawnHeart()
{
	var heart = new Item('heart', player.x + 20, player.y + 20, 32, 32);
	heart.x = Math.round(25 + (Math.random() * (canvas.width - 50)));
	heart.y = Math.round(25 + (Math.random() * (canvas.height - 50)));
	if(vectorDistance(player.x,player.y,heart.x,heart.y) < 32)
	{
		spawnHeart();
		return;
	}
	heart.scale = 0;
	heart.scaleSpeed = 1.5;
	objectsArr.push(heart);
}

function spawnBall()
{
	var ball = new Item('ball', 20, 20, 32, 32);
	ball.velx = 250;
	ball.vely = 250;
	objectsArr.push(ball);
	console.log(ball);
}

function vectorDistance(x1, y1, x2, y2)
{
	return Math.sqrt((x1-x2)^2+(y1-y2)^2)
}

//spawn particles for something
function spawnParticles(x, y, name)
{
	var particleCount = 10;
	var speed = 50;
	if(name == "heartPickup")
	{
		for(var i = 0; i < particleCount; i++)
		{
			var particle = new Item('particle', x, y, 8, 8);
			var randAngle = Math.random()*2*Math.PI; //pick a random angle for the particle to go in
			particle.velx = speed*Math.sin(randAngle); //and use trigonometry to set the velocities
			particle.vely = speed*Math.cos(randAngle);
			particle.lifetime = 2;
			particle.scaleSpeed = 1.5;
			objectsArr.push(particle);
		}
	}
}

$(document).ready(function()
{
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	$("#game-screen").append(canvas);
	
	$("#start").click(function()
	{
		$("#start-screen").hideUp();
		$("#game-screen").showUp();
		playGame();
	});
	$("#help").click(function()
	{
		$("#start-screen").hideUp();
		$("#help-screen").showUp();
	});
	$("#back").click(function()
	{
		$("#help-screen").hideUp();
		$("#start-screen").showUp();
	});
});

function playGame()
{
	// Let's play this game!
	then = Date.now();
	reset();
	main();
}

function success()
{
	console.log("YAY!");
	$("#main").fadeOut("slow", function()
	{
		$("#viktory").show(function(){$(this).css("opacity",1)});
	});
}