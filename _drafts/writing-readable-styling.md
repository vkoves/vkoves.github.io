---
layout: default
isPost: true
categories: Coding
---

When writing styling, it can be a challenge to write styling that's readable,
but proper use of classes, different HTML tags, and organization in your styling
can help. 

For this I'll be dealing mostly with SCSS, as that's what I use most often,
but this is directly applicable to CSS as well.

To start, lets give some simple example HTML for a website's header, with a logo
and some basic navigation buttons, which is shown below.

{% highlight html linenos %}
<html>
<head>...</head>
<body>
  <div>
    <div><img src="logo.png"></div>
    <!-- Navigation Menu -->
    <a href="/">
        <span>Home</span>
    </a>
    <a href="/about">
        <span>About</span>
    </a>
    <a href="/sign-in">
        <span>Sign In </span>
    </a>
    <a href="/sign-up">
        <span>Sign Up</span>
    </a>
    <div><img src="menu.png"></div>
  </div>
...
{% endhighlight %}

One of the strange things that I've seen is people doing when using SCSS is
exploiting the HTML tags and the structure to create styling:

{% highlight scss linenos %}
div:first-of-type
{
    position: fixed;
    top: 0px;
    width: 100%;
    height: 50px;

    div:first-of-type
    {
        height: 90%;
        margin-top: 5%;
    }
    span
    {
        font-size: 12px;
    }
    div:last-of-type
    {
        width: 50px;
        height: 50px;
    }
}
{% endhighlight %}

This is technically correct, but has two main problems - *britleness* and *readability*.

What do I mean by saying this code is brittle? Styling is meant to be compartmentalized,
but reusable in a wide variety of scenarios. This styling makes assumptions about the 
layout of the doucment that can be extremely dangerous, and make it so any small change
made to the HTML, even in just the order of elements, will break this styling. Although
you could say it's fair to assume the header is the first div on the page, consider what
would happen if a notification has to be displayed which shows up above the header, like
so:

{% highlight html linenos %}
...
  <div class="user-notification">You need to sign in to do that!</div>
  <div class="header">
    <div class="logo"><img src="logo.png"></div>
...
{% endhighlight %}

The header styling would now be applied to the `.user-notification` element, and the actual
header would have no styling applied to it, a very large problem. This means that the header
**must**, under all circumstances, be the first `<div>` in the document, and due to the inner
styling, it is then even required that the logo must be the first `<div>` in the header, and
that the mobile-menu must be the last one, additional requirements that put unnecessary
restrictions on the layout of the HTML.

It is worth noting that even if you are absolutely sure that the layout will not change, and
will conform to the rules of layout your CSS specifies, it is still unwise to code these 
assumptions into your CSS, as that makes the styling and the DOM no longer independent, which
violates one of the main reasons CSS exists, which is to keep content and styling separate
and independent from each other.

The other reason this styling is not preferred is readability. Looking at the styling alone,
can you determine what everything means? What is `div:first-of-type`, and why is it fixed?
It is impossible to tell from the styling alone, and requires some work to understand even
with access to the HTML, as you have to still find which elements are the first and last in
their scope, and determine which of them receive which styling rules.

Both of these problems can be solved by just doing the proper styling, and using the CSS
classes that are specified in the HTML to style the header.

{% highlight html linenos %}
<html>
<head>...</head>
<body>
  <div class="header">
    <div class="logo"><img src="logo.png"></div>
    <!-- Navigation Menu -->
    <a href="/">
        <span class="nav-buttons">Home</span>
    </a>
    <a href="/about">
        <span class="nav-buttons">About</span>
    </a>
    <a href="/sign-in">
        <span class="nav-buttons">Sign In </span>
    </a>
    <a href="/sign-up">
        <span class="nav-buttons">Sign Up</span>
    </a>
    <div class="mobile-menu-icon"><img src="menu.png"></div>
  </div>
...
{% endhighlight %}

Given this HTML, what is the best way to style this menu? Using SCSS, this
type of styling is probably best:

{% highlight scss linenos %}
header
{
    position: fixed;
    top: 0px;
    width: 100%;
    height: 50px;

    .logo
    {
        height: 90%;
        margin-top: 5%;
    }
    .nav-buttons
    {
        font-size: 12px;
    }
    .mmobile-menu-icon
    {
        width: 50px;
        height: 50px;
    }
}
{% endhighlight %}

