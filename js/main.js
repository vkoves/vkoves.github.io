/* exported showInfo, closeInfo, setPageBlur */

var OpenClass = '-open';

$(document).ready(function()
{
    // Mark menu as not open
    $('#menu-btn').attr('aria-expanded', 'false');

    $('#menu-btn').click(function()
    {
        if ($('#header').hasClass(OpenClass)) {
            $('#header').removeClass(OpenClass);
            $('#menu-btn').attr('aria-expanded', 'false');
        }
        else {
            $('#header').addClass(OpenClass);
            $('#menu-btn').attr('aria-expanded', 'true');
        }
    });
});

/* General Functions */

// Shows an overlay with text, including a title and description, to explain something.
function showInfo(title, description)
{
    $('body').append('<div id="overlay-info" class="overlay-transparent">' +
        '<div class="centered info-cont">' +
            '<div class="title">' + title + '</div>' +
            '<div class="description">' + description + '</div>' +
        '</div>' +
        '<button id="close" class="over-btn">' +
            '<img alt="Close info overlay" src="/images/icons/cross.svg">' +
        '</button>' +
    '</div>');
    $('#overlay-info .centered').click(function(event)
    {
        event.stopPropagation();
    });
    $('#overlay-info').click(closeInfo);
    $('#overlay-info').fadeIn();
    setPageBlur(true);
}

// Fades out and removes the info overlay specifically
function closeInfo()
{
    setPageBlur(false);
    $('#overlay-info').fadeOut(function()
    {
        $(this).remove();
    });
}

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
