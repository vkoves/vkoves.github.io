---
layout: post
title: "My Personal Site's Accessibility Makeover"
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

{% include linkedHeading.html heading="My Mistakes" level=2 %}

Despite my best efforts, automated tools and using a screen reader as a sighted user is only a best guess at what users might really need. I was very appreciative when someone reached out to me on LinkedIn and told me that they had a hard time navigating my portfolio page because I hadn't used headers to break apart the page.

This is something I had completely missed in my testing! I was looking so much at automated auditing tools and full-on accessibility "failures" that I missed a huge piece of usability improvement. In this moment, I should have taken the advice that I gave in a [previous  article][tools-article]:

> Remember that automated auditing tools are a starting point to learning about whether a site is accessible, but they aren't fool-proof. There are lots of things that are really important to accessibility like tab order and keyboard interactivity that an automated tool is going to have a very hard time testing, if it can test it at all.

In closing, I think it is important to remember that no matter how hard we might try to accommodate everyone's accessibility needs, we are just making our best guesses and we are likely going to miss something. This is why frameworks like inclusive design are so critical - our users are ultimately the true determination of whether we really made a fully accessible site.


<!-- All links for simplicity -->
[gh-milestone]: https://github.com/vkoves/vkoves.github.io/milestone/1?closed=1
[tools-article]: {% post_url 2020-02-09-the-accessible-developers-starter-kit %}