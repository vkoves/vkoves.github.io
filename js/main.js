$(document).ready(function()
{
	//Hide the body to start
	$("body").hide();

	//Add in the header. This makes it so I don't have to update the header in each file
	$("body").prepend(
	'<div id="header">' +
		'<div id="header-inside">' +
			'<span id="title"><a href="index.html">Viktor K&ouml;ves</a></span>' +
			'<div id="header-buttons">' +
				'<span><a href="about.html">About</a></span> |' +
				'<span><a href="portfolio.html">Portfolio</a></span> |' +
				'<span><a href="http://www.indigobox.us">IndigoBox</a></span> |' +
				'<span><a href="lowvoltage.html">Low Voltage</a></span>' +
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
	'<link href="css/main.css" rel="stylesheet">' +
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
			$("body").css("padding-top", "0");
		}
		else
		{
			$("#header").css("padding-bottom", "30");
			$("body").css("padding-top", "30");
		}
	});
});

$(window).on('resize', function()
{
	if($(window).width() > 600)
	{
		$("#header").css("padding-bottom", "0");
		$("body").css("padding-top", "0");
	}
});