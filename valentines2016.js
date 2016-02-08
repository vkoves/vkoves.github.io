//Lovely tutorial on how to make games with HTML5 Canvas: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
//Thanks to that for helping me figure this out

var animTime = 1000;
$.fn.showUp = function()   { $(this).show("slide", { direction: "down" }, animTime); }
$.fn.hideDown = function() { $(this).hide("slide", { direction: "down" }, animTime); }
$.fn.hideUp = function()   { $(this).hide("slide", { direction: "up" }, animTime); }
$.fn.showDown = function() { $(this).show("slide", { direction: "up" }, animTime); }


// Cross-browser support for requestAnimationFrame
var w = window;
var canvas;
var ctx;
var then;
var bgReady = false;
var playerReady = false;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var player = {
	speed: 200, //the movement speed in pixels per second
	x: 0,
	y: 0,
	width: 25,
	height: 25
};

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
	if (38 in keysDown) // Player holding up
	{
		player.y -=	player.speed * modifier;
	}
	if (40 in keysDown) // Player holding down
	{ 
		player.y +=	player.speed * modifier;
	}
	if (37 in keysDown) // Player holding left
	{
		player.x -=	player.speed * modifier;
	}
	if (39 in keysDown) // Player holding right
	{
		player.x +=	player.speed * modifier;
	}
}

// Draw everything
function render()
{
	if (bgReady)
	{
		ctx.drawImage(bgImage, 0, 0);
	}
	else
	{
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.fillRect(0,0,800,600);
	}

	if (playerReady)
	{
		ctx.drawImage(heroImage, player.x, player.y);
	}
	else
	{
		ctx.fillStyle = "rgb(250, 0, 0)";
		ctx.fillRect(player.x, player.y, player.width, player.height);	
	}

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