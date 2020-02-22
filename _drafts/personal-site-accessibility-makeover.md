---
layout: post
title: "How I Gave My Personal Site An Accessibility Makeover"
---

These days, accessibility is one of my biggest passions and something that I am proud to know a lot about, but it wasn't always this way. Let me tell you how I went about fixing my old, inaccessible, personal site and making it fully accessible and WCAG compliant.


{% include linkedHeading.html heading="Background" level=2 %}

First, a little background. I started building out my personal website in October of 2016 and at that point I had no accessibility knowledge at all. I hadn't even really heard of accessibility in terms of the web! Not surprisingly, because I lacked the knowledge to make an accessible website, the first version of viktorkoves.com was an accessibility mess. It was riddled with trivial issues that I could have easily caught, had I known better.

Come December of 2018, however, I knew a whole lot about website accessibility and I wanted to make sure that my personal website would showcase my newfound knowledge and skills. Especially as a developer who specialized in web accessibility, it felt paramount that my website be usable to everyone possible.

To do that, I set out to audit my website and make it fully WCAG 2.1 AA accessible. (Not sure what the heck WCAG is? Don't worry, I'll be writing about that soon!)


{% include linkedHeading.html heading="Process" level=2 %}

So how did I go about making an inaccessible website that I built years ago into something that was fully accessible and that I could be proud to show off? My process can be very simply distilled into the following steps:

1. Run automated tests to discover "simple" issues
1. Manually test with screen reader and keyboard only
1. Fix discovered issues
1. Repeat

To start any accessibility remediation, you have to know what the issues are that you are trying to fix. I used some automated tools, like HTML Codesniffer, to find any simple accessibility failures. This included things like my gallery page not having any `alt` tags on the images and my homepage skipping from a level 1 heading (`<h1>`) to a level 4 heading (`<h4>`).

You can read about more tools you can use to test your website's accessibility in [my previous article][tools-article].

Automated tools found a good number of issues, but automated tools only cover part of what makes a site accessible, so I then proceeded to test using my site with just my keyboard, and then tested it with a screen reader. I discovered that the main functionality of my portfolio page was completely inaccessible to users who were limited to the keyboard, as some of my links only showed up on hover of the portfolio images. I also realized that my gallery overlay system did not make it clear what buttons did to screen readers.

If you are curious what all of the issues were that I found in testing my website, you can view some of the issues I found with my site in [my WCAG 2.1 AA GitHub milestone][gh-milestone].


{% include linkedHeading.html heading="Some Example Failures" level=2 %}

{% include linkedHeading.html heading="Color Contrast on Homepage Links" level=3 %}

One of the first failures I saw was one that HTML_CodeSniffer found, which was a contrast issue on my homepage, which I documented in [GitHub issue #6](https://github.com/vkoves/vkoves.github.io/issues/6) on my personal site's repository.

![HTML_CodeSniffer error showing contrast failure](/post-assets/contrast-issue.jpg)

At first glance, this red on black text does not look like it's very low contrast - and to some folks it might be perfectly sufficient! However, if you look at this screenshot in greyscale, you can see the problem:

![HTML_CodeSniffer error showing contrast failure in greyscale](/post-assets/contrast-issue-greyscale.jpg)

For users who have color-blindness, this pair of colors is very hard to discern, making this text really hard to read! This is because although the colors are fairly different by _hue_ they are not far apart in brightness.

Luckily, this issue was very easy to fix. HTML_CodeSniffer suggested a new red color that was a bit brighter, and switching my links over to that resolved this failure and made those links a lot easier to read for everyone.

{% include linkedHeading.html heading="Social Media Links Not Having Content" level=3 %}

Another accessibility issue I found with HTML_CodeSniffer is the social media links in my footer not having content, which I notated in [GitHub issue #6](https://github.com/vkoves/vkoves.github.io/issues/5) on my personal site's repository. Here's a screenshot of the failure from HTML_CodeSniffer:

![HTML_CodeSniffer error showing link without content](/post-assets/link-no-cont-issue.jpg)

Reading through the text of the error, this might seem a little confusing. What do you mean this anchor element has "no link content"? It's an image!

In this case, what this was actually indicating was that I had used a `<div>` with a background image for my social media icons, and that was causing a very big accessibility problem. This is because although `<img>` tags have an `alt` attribute that you can use to specify text that a screen reader user will here to represent the image, you can't do that with a `<div>` element!

This meant that on my personal site, if a screen reader user tabbed down to the footer, they would hear... nothing. After all, there was nothing _in the link_ to explain what it was!

There are two ways I could have fixed this issue:

1. Switch to an `<img>` element and use an `alt` tag to describe the image
1. Use an alternate way of labelling the links, like an `aria-label`

Although the first solution is preferable and makes your HTML more semantic, I
was using SVGs for my social media icons and was planning to move them into a spritesheet, which would have been very difficult to do with an `<img>` element.

Thus, I ended up taking the latter approach. Here's what the **faulty code** was before:

{% highlight html %}
<a href="https://www.linkedin.com/in/viktorkoves"
  aria-label="Viktor on LinkedIn">
    <div class="linkedin"></div>
</a>
{% endhighlight %}

And here is the **corrected, accessible version**:

{% highlight html %}
<a href="https://www.linkedin.com/in/viktorkoves"
  aria-label="Viktor on LinkedIn">
    <div class="linkedin"></div>
</a>
{% endhighlight %}

{% include linkedHeading.html heading="What I Missed" level=2 %}

Despite my best efforts, automated tools and using a screen reader as a sighted user is only a best guess at what users might really need. I was very appreciative when someone reached out to me on LinkedIn and told me that they had a hard time navigating my portfolio page because I hadn't used headers to break apart the page.

This is something I had completely missed in my testing! I was looking so much at automated auditing tools and full-on accessibility "failures" that I missed a huge piece of usability improvement. In this moment, I should have taken the advice that I gave in a [previous  article][tools-article]:

> Remember that automated auditing tools are a starting point to learning about whether a site is accessible, but they aren't fool-proof. There are lots of things that are really important to accessibility like tab order and keyboard interactivity that an automated tool is going to have a very hard time testing, if it can test it at all.

In closing, I think it is important to remember that no matter how hard we might try to accommodate everyone's accessibility needs, we are just making our best guesses and we are likely going to miss something. This is why frameworks like inclusive design are so critical - our users are ultimately the true determination of whether we really made a fully accessible site.


<!-- All links for simplicity -->
[gh-milestone]: https://github.com/vkoves/vkoves.github.io/milestone/1?closed=1
[tools-article]: {% post_url 2020-02-09-the-accessible-developers-starter-kit %}