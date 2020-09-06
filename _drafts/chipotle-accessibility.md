---
layout: post
title: "Chipotle's Ordering Experience is Inaccessible - Here's How & How to Fix It"
---

Recently, I was ordering some delivery from Chipotle, and out of curiosity I tried to tab through the menu, only to discover I couldn't! Here's some of the issues that make the Chipotle ordering experience inaccessible, and how you can prevent them in your own project.

**NOTE:** I wrote this article in September of 2020, and Chipotle may well have fixed these issues by the time you're reading this (I sure hope so!) This article is a review of the issues with their site at the time it's published.

{% include linkedHeading.html heading="The Homepage - Starting Our Order" level=2 %}

So first off, let's start at the homepage. Let's say I am a user who is only using a keyboard and I want to order a burrito. Great, it's on the homepage! Let me just press Tab to get over there:

<video controls>
    <source src="/post-assets/chipotle-a11y/chipotle-home-focus.mp4"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>

If you can't watch the video above, I tried focusing the order button, but after focus moved naturally through several items in the header, it just jumped to a single terms link after the Order button and then down to the footer! No matter how I try tabbing around the page, I absolutely cannot focus either the Order Now button or a specific food item.

So why might this be? Unless they are using `tabindex="-1"` (which removes an element) from tab order the only way this could be is if the site wasn't using semantic HTML. Let's start by taking a look at the "Order" button using the Chrome DevTools!

![Chipotle "Order" button inspected, showing it's just a <div>](/post-assets/chipotle-a11y/order-btn-inspected.jpg)

Oh dear, that's just a `<div>`! Thanks to the powers of Javascript, we can make a `<div>` interactive, but that does not mean we _should_. There's a lot of inherent functionality that comes with the HTML `<button>` element, and one of them is that it's tabbable by default and clearly interactive to screen readers. Since this is just a `<div>` though, we can't tab it and a screen reader won't identify this element as a button!

What about the "Burrito" button, is it the same situation there?

![Chipotle "Burrito" button inspected, show it's just a <div> wrapped around an <img>](/post-assets/chipotle-a11y/burrito-btn-inspected.jpg)

Well sheesh, it looks like it is! Here we've got an `<img>` element wrapped in a `<div>` that likely has some Javascript hooked up to make it interactive. Once again, this doesn't get added to tab order and also isn't clearly interactive to screen readers, so **if you're not using a mouse there's no way for you to even start ordering food from Chipotle!** That's a giant accessibility issue if I've ever seen one 😬
