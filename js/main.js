$(document).ready(function()
{
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