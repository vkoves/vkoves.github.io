$(document).ready(function()
{
	//Hide the body to start
	$("body").hide();

	var linkEnding = ".html";
	var onProduction = false;

	if(window.location.href.indexOf("viktorkoves.com") > -1) //if this is production
	{
		onProduction = true;
		linkEnding = ""; //don't use the .html ending, as the GitHub server (and most servers really), will auto route to the .html with a mask

		//Iterate through all local links and remove the .html ending as well
		$(".local-link").each(function()
		{
			$(this).attr("href", $(this).attr("href").replace(".html", ""));
		});
	}


	//Add in the header. This makes it so I don't have to update the header in each file
	$("body").prepend(
	'<div id="header" class="filter-transition">' +
		'<div id="header-inside">' +
			'<span id="title"><a href="index' + linkEnding + '">Viktor K&ouml;ves</a></span>' +
			'<div id="header-buttons">' +
				'<span><a href="about' + linkEnding + '">About</a></span> |' +
				'<span><a href="gallery' + linkEnding + '">Gallery</a></span> |' +
				'<span><a href="http://www.indigobox.us">IndigoBox</a></span> |' +
				'<span><a href="lowvoltage' + linkEnding + '">Low Voltage</a></span>' +
			'</div>' +
			'<img id="menu" src="images/menu.svg">' +
		'</div>' +
	'</div>');

	//Add in content from the <head> tag so we don't need to put in the title and favicon everywhere
	$("head").append(
	'<title>Viktor K&ouml;ves</title> <!-- Oh what fun, an Oumlaut! -->' +
	'<link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>' +
	'<!-- Added Open Sans from Google Fonts -->' +
	'<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,800italic,800,700,700italic,600italic,600,400italic" rel="stylesheet" type="text/css">' +
	'<meta name="theme-color" content="#D80000">' +
	'<meta name="viewport" content="width=450, initial-scale=0.75">' +
	'<meta name="google-site-verification" content="aivQX75RILmCefXvQj496cBxd8ycZ-AWTKRMQJGoyA4" />' +
	'<!-- Google Analytics -->' +
	"<script>" +
	  "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
	  "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
	  "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
	  "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" +
	  "ga('create', 'UA-39148744-3', 'auto');" +
	  "ga('send', 'pageview');" +
	"</script>");

	//Add in footer
	$("body").append(
	'<div class="footer filter-transition">' +
		'<div class="social-bar">' +
			'<a href="https://github.com/vkoves" target="_blank">' +
				'<div class="github"></div>' +
			'</a>' +
			'<a href="http://vkstech.tumblr.com/" target="_blank">' +
				'<div class="tumblr"></div>' +
			'</a>' +
			'<a href="https://twitter.com/viktork007" target="_blank">' +
				'<div class="twitter"></div>' +
			'</a>' +
			'<a href="https://www.linkedin.com/in/viktorkoves" target="_blank">' +
				'<div class="linkedin"></div>' +
			'</a>' +
		'</div>' +
	'</div>')

	// Talk about strange hacks. This whole configuration is a workaround
	// for me using a basic HTML site when I'm used to framework languages,
	// and in this case I hide the body for a moment to let CSS and things load.
	// For some reason it seems to work with a timeout of zero milliseconds.
	window.setTimeout(function()
	{
		$("body").show();
	}, 0);

	$("#menu").click(function()
	{
		var topPadding = parseInt($("#header").css("padding-bottom"));
		if(topPadding > 0) //close
		{
			$("#header").css("padding-bottom", "0");
		}
		else
		{
			$("#header").css("padding-bottom", "30");
		}
	});
});

$(window).on('resize', function()
{
	if($(window).width() > 600)
	{
		$("#header").css("padding-bottom", "0");
	}
});

/* General Functions */

// Shows an overlay with text, including a title and description, to explain something.
function showInfo(title, description)
{
	$("body").append('<div id="overlay-info" class="overlay-transparent">' +
		'<div class="centered info-cont">' +
			'<div class="title">' + title + '</div>' +
			'<div class="description">' + description + '</div>' +
		'</div>' +
		'<img id="close" src="images/icons/cross.svg">' +
	'</div>');
	$("#overlay-info .centered").click(function(event)
	{
		event.stopPropagation();
	});
	$("#overlay-info").click(closeInfo);
	$("#overlay-info").fadeIn();
	setPageBlur(true);
}

// Fades out and removes the info overlay specifically
function closeInfo()
{
	setPageBlur(false);
	$("#overlay-info").fadeOut(function()
	{
		$(this).remove();
	});
}

// instantiates a gallery given a gallery data object, which contains info about all images to display
// this can be either an array of hashes if you want more information in each gallery item
// or an array of strings if you just need to display images
// Possible options
//	showInfo {Boolean} - whether to show a small info icon on the bottom left. DEFAULT - false
// TODO: Make gallery show a counter or a preview thing at the bottom
function Gallery(galleryData, options)
{
	this.galleryData = galleryData; //the gallery data
	this.currentImageIndex; //the index of the image being displayed in the gallery data
	this.options = options;
	self = this; // we need a scoped version of the gallery object for reference in functions

	// Create the HTML if it isnt' there already
	if($("#overlay-main").length == 0)
	{
		var navigationDots = ""; // HTML for the navigation circles that show you how many images there are
		navigationDots = '<div class="nav-dot"></div>'.repeat(galleryData.length); //repeat a single dot as many times as there are image

		$("body").append(
			'<div id="overlay-main" class="overlay overlay-transparent">' +
			'</div>' +
			'<div id="overlay-controls" class="overlay">' +
				'<img id="close" src="images/icons/cross.svg">' +
				'<img id="right" class="vertically-centered arrow" src="images/icons/chevron-thin-right.svg">' +
				'<img id="left" class="vertically-centered arrow" src="images/icons/chevron-thin-left.svg">' +
				'<div class="gallery-nav">' + navigationDots + '</div>' +
			'</div>'
		);
	}

	// Show the image with the given index in the galleryData
	this.showImage = function(index)
	{
		self.currentImageIndex = index;
		$("#overlay-controls .nav-dot").removeClass("active");
		$($("#overlay-controls .nav-dot")[index]).addClass("active");
		setOverlayImage(getImageUrl(this.galleryData[index])); //set the image
		setPageBlur(true);
		$(".overlay").fadeIn(); //then fade in
	}

	// Go to the next image
	this.nextImage = function()
	{
		if($("#overlay-info:visible").length > 0) //if info is showing up
			return; //don't do anything

		if(self.currentImageIndex < self.galleryData.length - 1) // if we aren't on the last item in the gallery
	  		self.currentImageIndex++; //go to next
	  	else //otherwise, loop back to the first
	  		self.currentImageIndex = 0;

	  	self.showImage(self.currentImageIndex);
	}
	this.previousImage = function()
	{
		if($("#overlay-info:visible").length > 0) //if info is showing up
			return;

		if(self.currentImageIndex > 0)
	  		self.currentImageIndex--;
	  	else
	  		self.currentImageIndex = self.galleryData.length - 1;

	  	self.showImage(self.currentImageIndex);
	}

	// closes the gallery with a nice animation
	this.close = function(callback)
	{
		setPageBlur(false);
		$(".overlay").fadeOut(callback);
	}

	// closes the gallery and deletes all DOM associated
	this.destroy = function()
	{
		self.close(function()
		{
			$("#overlay-main, #overlay-controls").remove();
		});
	}

	// Now that all methods are defined, let's map them to the DOM
	$("#overlay-main, #overlay-controls #close").click(self.close);
	$("#overlay-controls #right").click(self.nextImage);
	$("#overlay-controls #left").click(self.previousImage);

	/*****************************/
	/****** PRIVATE METHODS ******/
	/*****************************/

	function setOverlayImage(url)
	{
		if($("#overlay-main:visible").length > 0 && $("#overlay-main img").length > 0) //if there's already an image
		{
			$("#overlay-main .img-container").fadeOut(300, function() //fade it out
			{
				//then transition to new image by setting it, hiding it instantly, then fadin in
				setOverlayHTMLWithImage(url);
			  	$("#overlay-main .img-container").hide().fadeIn(300);
			});
		}
		else
		{
			setOverlayHTMLWithImage(url);
		}

		function setOverlayHTMLWithImage(url)
		{
			var infoIcon = "";

			if(options && options.showInfo)
				infoIcon = '<div class="icon info"></div>';

		  	$("#overlay-main").html(
		  	'<div class="img-base centered">' +
		  		'<div class="img-container">' +
			  		'<img src="' + url + '">' +
			  		infoIcon +
		  		'</div>' +
		  	'</div>');

		  	$("#overlay-main .img-container").click(function(event)
		  	{
		  		event.stopPropagation();
		  	});

		  	$("#overlay-main .img-container .icon.info").click(function()
		  	{
		  		showInfo(self.galleryData[self.currentImageIndex].title, self.galleryData[self.currentImageIndex].description)
		  	});
		}
	}

	/*
	 * Returns the image url from a given gallery item. This is needed as gallery items
	 * may be Javascript objects with a URL field, or just straight string URLs.
	 * @param {Object/string} galleryItem - The gallery item we want to get the URL of
	 * @return {string}	- The URL of the gallery item passed in
	 */
	function getImageUrl(galleryItem)
	{
		if (typeof galleryItem == "object")
			return galleryItem.url;
		else if (typeof galleryItem == "string")
			return galleryItem;
		else
		{
			console.error("Invalid gallery item type: " + typeof galleryItem);
			return null;
		}
	}
}

function setPageBlur(isBlurred)
{
	if(isBlurred)
		$("#header, .page-container, .footer").addClass("blur");
	else
		$("#header, .page-container, .footer").removeClass("blur");
}