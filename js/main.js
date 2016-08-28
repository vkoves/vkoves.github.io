$(document).ready(function()
{
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