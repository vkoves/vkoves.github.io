/* exported Gallery */

/**
 * General page functions
 */

// Blur the page and disable focus on it
function setPageBlur(enableBlur)
{
    var elems = $('#header, .page-container, .footer');
    var tabbableElements = $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');

    if (enableBlur) {
        elems.addClass('blur');
        disableTabbingOnPage(tabbableElements);
    }
    else {
        elems.removeClass('blur');
        reEnableTabbingOnPage(tabbableElements);
    }
}

// Source: https://www.webappcessibility.com/technical/keeping-tab-focus-within-modals/
function disableTabbingOnPage(tabbableElements) {
    $.each(tabbableElements, function (index, elem) {
    // Ensure not in main modal, info modal or modal controls
        if($(elem).parents('#overlay-controls').length == 0
            && $(elem).parents('#overlay-main').length == 0
            && $(elem).parents('#overlay-info').length == 0) {
            $(elem).attr('tabindex', '-1');
        }
    });
}

function reEnableTabbingOnPage(tabbableElements) {
    $.each(tabbableElements, function (index, elem) {
        $(elem).attr('tabindex', '0');
    });
}

// instantiates a gallery given a gallery data object, which contains info about all images to display
// this can be either an array of hashes if you want more information in each gallery item
// or an array of strings if you just need to display images
// Possible options
//  showInfo {Boolean} - whether to show a small info icon on the bottom left. DEFAULT - false
function Gallery(galleryData, options)
{
    this.galleryData = galleryData; //the gallery data
    this.currentImageIndex; //the index of the image being displayed in the gallery data
    this.options = options;
    var self = this; // we need a scoped version of the gallery object for reference in functions

    // Create the HTML if it isnt' there already
    if($('#overlay-main').length == 0)
    {
        var navigationDots = ''; // HTML for the navigation circles that show you how many images there are
        navigationDots = '<div class="nav-dot"></div>'.repeat(galleryData.length); //repeat a single dot as many times as there are image

        // Have overlay-controls first so it gets focus first
        $('body').append(
            '<div id="overlay-controls" class="overlay">' +
                '<button id="close" class="over-btn">' +
                    '<img src="/images/icons/cross.svg" alt="Close overlay">' +
                '</button>' +
                '<button id="left" class="over-btn vertically-centered">' +
                    '<img class="arrow" src="/images/icons/chevron-thin-left.svg" alt="Previous image">' +
                '</button>' +
                '<button id="right" class="over-btn vertically-centered">' +
                    '<img class="arrow" src="/images/icons/chevron-thin-right.svg" alt="Next image">' +
                '</button>' +
                '<div class="gallery-nav">' + navigationDots + '</div>' +
            '</div>' +
            '<div id="overlay-main" class="overlay overlay-transparent">' +
            '</div>'
        );

        $('.nav-dot').click(function()
        {
            self.showImage($(this).index()); //show the image with the same index as this dot
        });
    }

    // Show the image with the given index in the galleryData
    this.showImage = function(index)
    {
        self.currentImageIndex = index;
        $('#overlay-controls .nav-dot').removeClass('active');
        $($('#overlay-controls .nav-dot')[index]).addClass('active');
        setOverlayImage(this.galleryData[index]); //set the image
        setPageBlur(true);
        $('.overlay').fadeIn(); //then fade in
    };

    // Go to the next image
    this.nextImage = function()
    {
        if($('#overlay-info:visible').length > 0) //if info is showing up
            return; //don't do anything

        if(self.currentImageIndex < self.galleryData.length - 1) // if we aren't on the last item in the gallery
            self.currentImageIndex++; //go to next
        else //otherwise, loop back to the first
            self.currentImageIndex = 0;

        self.showImage(self.currentImageIndex);
    };
    this.previousImage = function()
    {
        if($('#overlay-info:visible').length > 0) //if info is showing up
            return;

        if(self.currentImageIndex > 0)
            self.currentImageIndex--;
        else
            self.currentImageIndex = self.galleryData.length - 1;

        self.showImage(self.currentImageIndex);
    };

    // closes the gallery with a nice animation
    this.close = function(callback)
    {
        setPageBlur(false);
        $('.overlay').fadeOut(callback);
    };

    // closes the gallery and deletes all DOM associated
    this.destroy = function()
    {
        self.close(function()
        {
            $('#overlay-main, #overlay-controls').remove();
        });
    };

    // Now that all methods are defined, let's map them to the DOM
    $('#overlay-main, #overlay-controls #close').click(self.close);
    $('#overlay-controls #right').click(self.nextImage);
    $('#overlay-controls #left').click(self.previousImage);

    /*****************************/
    /****** PRIVATE METHODS ******/
    /*****************************/

    function setOverlayImage(galleryItem)
    {

        if($('#overlay-main:visible').length > 0 && $('#overlay-main img').length > 0) //if there's already an image
        {
            $('#overlay-main .img-container').fadeOut(300, function() //fade it out
            {
                //then transition to new image by setting it, hiding it instantly, then fadin in
                setOverlayHTMLWithImage(galleryItem);
                $('#overlay-main .img-container').hide().fadeIn(300);
            });
        }
        else
        {
            setOverlayHTMLWithImage(galleryItem);
        }

        function setOverlayHTMLWithImage(galleryItem)
        {
            var infoSect = '';
            var url = getImageUrl(galleryItem);
            var alt = typeof galleryItem == 'object' ? galleryItem.alt : undefined;

            if(options && options.showInfo) {
                infoSect = '<div class="info-sect">' +
                    '<button class="icon info" aria-label="More info"></button>' +
                    '<div class="title">' + galleryItem.title + '</div>' +
                    '<div class="description">' + galleryItem.description + '</div>' +
                '</div>';
            }

            if(url.indexOf('/thumbs') > -1) // if this is a thumbnail
                url = url.replace('/thumbs',''); // use the full size image

            $('#overlay-main').html(
                '<div class="img-base centered">' +
                '<div class="img-container">' +
                    `<img src="${url}"` +
                        (alt ? `alt="${alt}"` : '') + // add all tag if it exists
                        '>' +
                    infoSect +
                '</div>' +
            '</div>');

            $('#overlay-main .img-container').click(function(event)
            {
                event.stopPropagation();
            });

            $('#overlay-main .img-container .icon.info').click(function()
            {
                $('#overlay-main .info-sect').toggleClass('open');
            });
        }
    }

    /*
     * Returns the image url from a given gallery item. This is needed as gallery items
     * may be Javascript objects with a URL field, or just straight string URLs.
     * @param {Object/string} galleryItem - The gallery item we want to get the URL of
     * @return {string} - The URL of the gallery item passed in
     */
    function getImageUrl(galleryItem)
    {
        if (typeof galleryItem == 'object')
            return galleryItem.url;
        else if (typeof galleryItem == 'string')
            return galleryItem;
        else
        {
            console.error('Invalid gallery item type: ' + typeof galleryItem);
            return null;
        }
    }
}
