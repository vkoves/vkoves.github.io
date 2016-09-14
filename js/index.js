var delay = 5000; //the delay in animation
var imageTitles = ["Programmer", "Photographer", "Artist", "Web Developer"];
var imageURLs = ["/images/home/programmer.png", "/images/home/photographer.jpg", "/images/home/artist.png", "/images/home/web-developer.png"];
var currentIndex = 1;

$(document).ready(function() {
	$(".background-container .inner").bgswitcher({
	  images: imageURLs,
	  interval: delay
	});

	setInterval(animateText, delay);
});

function animateText()
{
	$(".photo-text.disabled").text(imageTitles[currentIndex]);
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