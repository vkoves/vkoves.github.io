$(document).ready(function()
{
	console.log("Ready");
	$("#menu").click(function()
	{
		console.log("C");
		var topPadding = parseInt($("#header").css("padding-bottom"));
		if(topPadding > 0) //close
		{
			$("#header").css("padding-bottom", "0");
			$("body").css("padding-top", "0");
		}
		else
		{
			$("#header").css("padding-bottom", "40");
			$("body").css("padding-top", "40");
		}	
	});
});

$(window).on('resize', function()
{
	console.log("Resize");
	if($(window).width() > 600)
	{
		$("#header").css("padding-bottom", "0");
		$("body").css("padding-top", "0");
	}
});