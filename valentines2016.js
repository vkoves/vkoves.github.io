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

	for(object in objectsArr) //check for collisions with all object
	{
		var obj = objectsArr[object];
		if(player.x <= (obj.x + obj.width)
		&& obj.x <= (player.x + player.width)
		&& player.y <= (obj.y + obj.height)
		&& obj.y <= (player.y + player.height))
		{
			objectsArr.splice(object, 1); //remove object by index
			heartsCollected++;
			spawnHeart();
		}
	}
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
		if(obj.type == "heart")
		{
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(obj.x+obj.width/2, obj.y+obj.width/2, obj.width/2, 0, 2*Math.PI);
			ctx.fill();
			ctx.drawImage(heartImage, obj.x+4, obj.y+5, obj.width-8, obj.height-8);
		}
	}

	//Draw hearts bar
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.fillRect(10, 10, 185, 30); //draw the background
	ctx.fillStyle = "red";
	var barAmount = 150*(heartsCollected/heartsGoal);
	if(barAmount > 150)
		barAmount = 150;
	ctx.fillRect(10,10,barAmount, 30);
	ctx.strokeStyle = "black";
	ctx.strokeRect(10, 10, 150, 30); //draw the border
	ctx.drawImage(heartImage, 165, 12, 25, 25);

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
	spawnHeart();
}

function spawnHeart()
{
	var heart = new Item('heart', player.x + 20, player.y + 20, 32, 32);
	heart.x = Math.round(25 + (Math.random() * (canvas.width - 50)));
	heart.y = Math.round(25 + (Math.random() * (canvas.height - 50)));
	objectsArr.push(heart);
}

function playGame()
{
	// Let's play this game!
	then = Date.now();
	reset();
	main();
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