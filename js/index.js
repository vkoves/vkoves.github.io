var delay = 5000; //the delay in animation
var imageTitles = ["Programmer <br><a href='portfolio.html'>Portfolio</a>", "Photographer", "Artist <br><a href='gallery.html'>Gallery</a>", "Web Developer <br><a href='portfolio.html'>Portfolio</a>"];
var imageURLs = ["/images/home/programmer.png", "/images/home/photographer.jpg", "/images/home/artist.png", "/images/home/web-developer.png"];
var currentIndex = 0;
var interval;

$(document).ready(function() {
	$(".background-container .inner").bgswitcher({
	  images: imageURLs,
	  interval: delay
	});

	$(".photo-text.active").html(imageTitles[currentIndex]); //set active text to first value manually, since we don't need animation
	currentIndex++; //and increment index

	interval = setInterval(animateText, delay);
});

function animateText()
{
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