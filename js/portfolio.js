var project; //the current project
var galleryInstance;

$(document).ready(function()
{
    $(".icons-cont .info-cont").click(function()
    {
        var project = getProject($(this).parent().attr("data-project-id"));
        showInfo(project.name, project.description);
    });

    $(".icons-cont .images-cont").click(function()
    {
        var project = getProject($(this).parent().attr("data-project-id"));

        if (galleryInstance) {
            galleryInstance.destroy();
        }

        galleryInstance = new Gallery(project.gallery); //setup a new gallery object
        galleryInstance.showImage(0); //and show the first image
    });

    $(".icons-cont .tools-cont").click(function()
    {
        var project = getProject($(this).parent().attr("data-project-id"));

        showInfo(project.name + " - Tools", getToolsHTML(project.tools));
    });

    $("body").keydown(function(event)
    {
      if (event.keyCode == 37) // left arrow
      {
        galleryInstance.previousImage();
      }
      else if (event.keyCode == 39) // right arrow
      {
        galleryInstance.nextImage();
      }
      else if (event.keyCode == 27) // escape
      {
        if (galleryInstance)
        {
            galleryInstance.destroy();
            galleryInstance = null;
        }
        else
        {
            closeInfo();
        }
      }
    });
});

function getProject(projectId) {
    var project = projects[projectId];

    if (project === undefined) {
        console.error('Cannot find project with ID ' + projectId + '!');
    }

    return project;
}

function getToolsHTML(tools)
{
    var toolsHTML = ""; // start generating HTML for the tools to display
    var tool; // the current tool
    var toolImage = null;

    for(var i = 0; i < tools.length; i++)
    {
        var tool = tools[i];
        var toolImage = getToolsImage(tool);

        if (toolImage)
            toolsHTML += '<div class="tool-cont"><img src="' + toolImage + '"><div class="text">' + tool + '</div></div>';
        else
        {
            var className = "featured-text"

            // if it's a short abbreviation (e.g. C#, JS, CSS)
            if (tool.length < 3) {
                className += " large"
            }

            toolsHTML += '<div class="tool-cont"><div class="' + className + '">' + tool + '</div><div class="text">' + tool + '</div></div>';
        }
    }

    return toolsHTML;
}

function getToolsImage(toolName)
{
    if (toolName == "C#" || toolName == "Google Charts") { // no images for C# or Google Charts
        return null;
    }
    else {
        return "images/tools/" + toolName.split(" ").join("_") + ".svg";
    }
}
