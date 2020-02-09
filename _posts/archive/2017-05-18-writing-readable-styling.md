---
layout: post
categories:
 - Archive
 - Coding
---

When writing styling, it can be a challenge to create styling that is readable, modular,
and functional, especially if you are in the process of learning CSS, or picked it up
recently. So how can you write readable styling?

This article should be common knowledge to those well versed in "proper"
CSS use, but for those who may have learned CSS slowly over time (as I have), I hope this
can serve as a helfpul resource. It is worth noting that for this piece I'll be dealing
mostly with SCSS, both because it is the language I use most often, and because it makes
the styling simpler and more readble. Take a look at the [Sass Manual](http://sass-lang.com/guide)
to learn more about SCSS.

To start, let us look at some example HTML for a website's header, with a logo
and some basic navigation buttons, shown below.

{% highlight html linenos %}
<html lang="en">
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

One of the strangest things that I have seen is people doing when using SCSS (or pure CSS) is
exploiting the HTML tags and the structure to create styling, like so:

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

This is technically correct (and would result in the desired visual look), but has two
main problems - *brittleness* and *readability*.

What do I mean by saying this code is brittle? Styling is meant to be compartmentalized,
but reusable in a wide variety of scenarios. This styling makes assumptions about the
layout of the document that can be extremely dangerous, and makes it so any small change
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

It is worth noting that even if you are absolutely sure that the layout of your HTML will not
change, and will conform to the rules of layout your CSS specifies, it is still unwise to program
these assumptions into your CSS, as that makes the styling and the DOM no longer independent. This
strict dependence on the HTML layout and styling nullifies the intent of CSS - separating content
and visual styling.

The other reason this styling is not preferred is its readability. Looking at the styling alone,
can you determine what everything means? An example: What is `div:first-of-type`, and why is it fixed?
From the styling alone, it is impossible to answer these questions, and even with access to the
HTML it poses a significant challenge. A developer would have to track down what the first div
is on the page, as well as what it contains, to try and understand the intention of the above CSS.

Both of these problems can be solved by just using more flexible styling, and using CSS
classes specified in the HTML to style the header.

Here is an improved HTML sample with sensical classes applied to the HTML.

{% highlight html linenos %}
<html lang="en">
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
.header
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
    .mobile-menu-icon
    {
        width: 50px;
        height: 50px;
    }
}
{% endhighlight %}

This styling is modular and easy to read thanks to the its use of proper CSS classes. The
nesting of the styling also enforces certain layout rules that are necessary for the styling
to make sense (such as navigation buttons being in the header element), and help to scope
the styling so that it isn't too general. Hopefully this quick piece can help provide a fresh
perspective on your styling work.