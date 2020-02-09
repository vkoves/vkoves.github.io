---
layout: post
isPost: true
categories:
 - Archive
 - Coding Tips
 - Jekyll
---

Working with Jekyll is a whole lot easier than dealing with tons and tons
of very redundant (and not at all DRY) HTML code. However, there's a few
tricks that I've come up with and used to help make life easier when using
Jekyll. I'll be updating this as I keep working with Jekyll and find out
new ways of doing things with it.

<h3 class="left-align">
	1. Make a system to import CSS and JS
</h3>

Why write HTML if you don't have to? For my website, I store all CSS and JS
files in one directory, so all imports start with the same path. Instead of
putting HTML code to import CSS and JS files on each page, I use front matter
to specify the CSS and JS files I want to import on that page.

How do I do this? In my layout's head tag, I have something like this:

{% highlight html linenos %}
{% raw %}
<html lang="en">
	<head>
	{% for stylesheet in page.stylesheets %}
		<link href="/css/{{  stylesheet }}" rel="stylesheet">
	{% endfor %}
	{% for script in page.scripts %}
		<script src="/js/{{ script }}"></script>
	{% endfor %}
	</head>
</html>
{% endraw %}
{% endhighlight %}

Then, on each individual page, my front matter looks something like this:

{% highlight html linenos %}
---
layout: post
stylesheets:
 - index.css
scripts:
 - index.js
---
{% endhighlight %}

This example is actually taken from my <code class="inline">index.html</code> page on this site,
which imports an index stylesheet and javascript file, as well as a jQuery
plugin. This makes it really easy for me to import CSS and JS files just
from their name.

<h3 class="left-align">
	2. Make your HTML completely DRY
</h3>

The main advantage to using Jekyll as opposed to raw HTML was the ability
to have layouts where I could put code that I reuse, such as the header and
footer that stays the same on every page. However, in using Jekyll, I started
extracting everything I possibly could into the layout.

This includes container divs (even if they aren't used on every page), core
stylesheets and javascript, and anything else you might think of. I like to
use page variables so I can disable some of these things if I don't need them
on a certain page. For instance, I have most pages with a limited page-container
that gives a nice side margin (for readable text), but this is disabled on more
custom, non text-based pages, like the homepage and the gallery.


<h3 class="left-align">
	3. Use Jekyll Comments <span class="no-bold">(if you don't want people
	reading your comments)</span>
</h3>

One of the main advantages of working in Ruby on Rails, one of the web frameworks
that I end up using most often, is the ability to create comments using embedded
Ruby code that never end up being outputted to the HTML. In the <code class="inline">.erb</code>
templating language, that looks something like this:

{% highlight html linenos %}
<header>
	<% if current_user %>
		<% # Only shows up if the user is signed in, so we can print sensitive info here %>
		<div class="user-details">
			<!-- Actual content -->
		</div>
	<% end %>
</header>
{% endhighlight %}

The good thing about these Rails comments is that I can safely detail security
characteristics of my applications, give explanations of how the backend works,
and more without giving this away to a slightly tech-savvy user who views my
source code. However, there's no way of putting comments in HTML that don't even
show up in source without some kind of pre-processing, which is where Jekyll has
been my saving grace.

Although I don't really need Jekyll comments (and my real source is on Github
anyway), I still find Jekyll comments useful for creating nice and clean HTML
output. If you aren't aware, you can do comments in Jekyll using the standard
Liquid syntax. Here's that same Ruby on Rails embedded example converted into
Liquid for Jekyll:

{% highlight html linenos %}
{% raw %}
<header>
	{% if current_user %}
		{% comment %}
			Only shows up if the user is signed in, so we can print sensitive info here
		{% endcomment %}
		<div class="user-details">
			<!-- Actual content -->
		</div>
	{% endif %}
</header>
{% endraw %}
{% endhighlight %}



