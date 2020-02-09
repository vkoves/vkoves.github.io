/* global Gallery, projectImages */

var galleryInstance;

$(document).ready(function()
{
    $('#proj-imgs').click(function()
    {
        if (galleryInstance) {
            galleryInstance.destroy();
        }

        galleryInstance = new Gallery(projectImages); //setup a new gallery object
        galleryInstance.showImage(0); //and show the first image
    });

    $('body').keydown(function(event)
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
        }
    });
});
