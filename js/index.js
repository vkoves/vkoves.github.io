var delay = 5000; //the delay in animation
var imageTitles = [
					"<div>Programmer</div> <a href='portfolio'>Portfolio</a>",
					"<div>Photographer</div> <a href='gallery#hobby-photos'>Gallery</a>",
					"<div>Web Developer</div> <a href='portfolio'>Portfolio</a>",
					"<div>Artist</div> <a href='gallery'>Gallery</a>",
				];
var imageURLs = ["/images/home/programmer.png", "/images/home/photographer.jpg", "/images/home/web-developer.png", "/images/home/artist.png"];
var currentIndex = 0;
var interval;

$(document).ready(function() {
	$(".background-container .inner").bgswitcher({
	  images: imageURLs,
	  start: false // don't loop default, loop using our setInterval for consistency
	});

	$(".photo-text.active").html(imageTitles[currentIndex]); //set active text to first value manually, since we don't need animation
	currentIndex++; //and increment index

	interval = setInterval(animateText, delay);
});

function animateText()
{
	$(".background-container .inner").bgswitcher("next");
	$(".photo-text.disabled").html(imageTitles[currentIndex]);
	$(".photo-text.active").fadeOut(function()
	{
		$(".photo-text.disabled").fadeIn(function()
		{
			var curr = $(".photo-text.disabled");
			var past = $(".photo-text.active");

			curr.removeClass("disabled").addClass("active");
			past.removeClass("active").addClass("disabled");
		});
	});

	currentIndex++;

	if(currentIndex >= imageTitles.length) //account for overflow
		currentIndex = 0;
}