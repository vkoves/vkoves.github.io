// Create projects array, an array of hashes that describe each project
var projects = {
    carpe: {
        name: "Carpe",
        gallery: [
            { url: "images/projects/Carpe (1).jpg", alt: "Carpe page with Jack Altman's schedule" },
            { url: "images/projects/Carpe (2).jpg", alt: "Carpe page with Jack Altman's followers" },
            { url: "images/projects/Carpe (3).jpg", alt: "Carpe page with Jack Altman's activity" },
        ],
        tools: [
            "Ruby on Rails",
            "jQuery UI",
            "jQuery",
            "Javascript",
            "HTML5",
            "CSS3",
        ]
    },
    scrollStop: {
        name: "Scroll Stop",
        description: "Scroll Stop was born from my desire to experiment with creating Google Chrome extension, and seizing the opportunity when a friend proposed the idea for a productivity app that specifically tackled lazy loading social media and content websites by stopping you from scrolling too far. That way if you need to message people on Facebook or other social media platforms, you still can, but it will prevent you from mindlessly scrolling through your newsfeed.",
        gallery: [
            { url: "images/projects/ScrollStop (1).png", alt: "Scroll stop page with settings" },
            { url: "images/projects/ScrollStop (2).png", alt: "indigoBox homepage with Scroll Stop inactive popup" },
        ],
        tools: [ "jQuery", "Javascript","HTML5", "CSS3" ]
    },
    lines: {
        name: "Lines",
        description: "A senior project in high school, Lines was an open source edge detection program with the goal of eventually turning it into computer vision software.",
        gallery: [
            { url: "images/projects/Lines (1).png", alt: "Photo of video game town in full color and made of only lines" },
            { url: "images/projects/Lines (2).png", alt: "Screenshot of Lines user interface with previous town image" },
            { url: "images/projects/Lines (3).png", alt: "Screenshot of Lines user interface with indigoBox homepage" },
        ],
        tools: [ "C#", "Visual Studio" ]
    },
    iBWebsite: {
        name: "indigoBox Website",
        description: "indigoBox, the software studio I lead, had an old introductory website for a long time, and it took a coordinated effort that I lead amongst our team to launch our new website, which showcases all of our main products as well as all of our members.",
        gallery: [
            { url: "images/projects/indigoBoxSite (1).png", alt: "indigoBox homepage screenshot" },
            { url: "images/projects/indigoBoxSite (2).png", alt: "indigoBox projects page screenshot" },
            { url: "images/projects/indigoBoxSite (3).png", alt: "indigoBox individual project page screenshot" },
        ],
        tools: [
            "jQuery",
            "Javascript",
            "CSS3",
            "HTML5"
        ]
    },
    transportCollective: {
        name: "The Transportation Collective",
        description: "A class inter-professional project, the Transportation Collective Website was born out of the unhappy experiences that our group members had on the CTA, and the challenge we found for customers on the CTA in reporting not technical issues. We sought to use big data to improve the rider experience on the CTA, and did research and interviews with CTA riders to help develop our solution.",
        gallery: [
            { url: "images/projects/TransCo (2).png", alt: "TransCo CTA homepage screenshot with issue map" },
            { url: "images/projects/TransCo (3).png", alt: "TransCo CTA issue map closeup, showing one issue at Morgan green line stop" },
            { url: "images/projects/TransCo (4).png", alt: "TransCo CTA recent issues list" },
            { url: "images/projects/TransCo (7).png", alt: "TransCo CTA status page screenshot" },
            { url: "images/projects/TransCo (9).png", alt: "TransCo CTA issues list at the Sox-35th red line stop" },
            { url: "images/projects/TransCo (10).png", alt: "TransCo CTA line graph of issues over time" },
        ],
        tools: [
            "Google Maps API",
            "Google Charts",
            "jQuery",
            "Javascript",
            "CSS3",
            "HTML5",
        ]
    },
    apollo: {
        name: "Apollo",
        description: "Apollo started as an experiment using the Spotify API, and can visualize some of the data that Spotify computes on tracks, such as danceability, acousticness, and more. If you want to see how it works in action, <a href='http://viktorkoves.com/apollo'>try it out</a>.",
        gallery: [
            { url: "images/projects/Apollo (1).png", alt: "Apollo screenshot showing graph of musical features for an album" },
        ],
        tools: [
            "Spotify API",
            "jQuery",
            "Javascript",
            "CSS3",
            "HTML5",
        ]
    }
};

var project; //the current project
var galleryInstance;

$(document).ready(function()
{
    $(".icons-cont .info-cont").click(function()
    {
        var project = projects[$(this).parent().attr("data-project-id")];
        showInfo(project.name, project.description);
    });

    $(".icons-cont .images-cont").click(function()
    {
        var project = projects[$(this).parent().attr("data-project-id")];

        if (galleryInstance) {
            galleryInstance.destroy();
        }

        galleryInstance = new Gallery(project.gallery); //setup a new gallery object
        galleryInstance.showImage(0); //and show the first image
    });

    $(".icons-cont .tools-cont").click(function()
    {
        var project = projects[$(this).parent().attr("data-project-id")];

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
