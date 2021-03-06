---
layout: post
title: The Accessible Developer&apos;s Starter Kit
---

Whether you are just starting out learning about web accessibility or you are an experienced developer well aware of accessibility, I want to help. This post will show you some of the tools that I have been using for the past few years to find and fix accessibility issues.

{% include linkedHeading.html heading="Auditing Tools" level=2 %}

<div class="notice-panel -warning">
  <div class="notice-label">Warning!</div>

  <p>
    Remember that automated auditing tools are a starting point to learning about whether a site is accessible, but they aren't fool-proof. There are lots of things that are really important to accessibility like tab order and keyboard interactivity that an automated tool is going to have a very hard time testing, if it can test it at all.
  </p>

  <p>
    The only sure fire way to find out if your site is fully accessible is to test it with a wide variety of users with disabilities, hire professional auditors, or both!
  </p>
</div>


{% include linkedHeading.html heading="HTML_CodeSniffer" level=3 %}

HTML_CodeSniffer is one of my favorite tools for doing a quick accessibility check on a page as it is super fast, can target multiple accessibility standards, and makes it really easy to filter between errors, warnings, and notices. I actually learned about it from an auditor who used it as a starting point for finding more simple failures like contrast that would take a long time to do manually.

Here&apos;s a screenshot showing it finding a contrast failure I put on my homepage:

![HTML_CodeSniffer error showing contrast failure](/post-assets/html-code-sniffer-example.jpg)

HTML_CodeSniffer is also surprisingly simple to install, since it&apos;s a
"bookmarklet" that just requires you to make a bookmark with some javascript code. Try it at the [HTML_CodeSniffer website][html-codesniffer]!


{% include linkedHeading.html heading="Chrome DevTools' Lighthouse" level=3 %}

If you are interested in website performance, you have probably heard about Lighthouse, an auditing tool built into Google Chrome&apos;s DevTools. You might already know that it can audit a website and make recommendations for performance and web best practices, but it&apos;s also great as a quick accessibility auditor!

Lighthouse does a number of automated accessibility checks, and also lists out checks you should do manually to properly confirm your sites accessibility. It gives you an overall score on accessibility from 1 to 100, which can help you get a good overall sense of if your site is mostly accessible or really inaccessible, which can be hard to determine with other tools.

Check it out in Google Chrome&apos;s DevTools, and learn more about it at the
[Chrome Lighthouse page][lighthouse].


{% include linkedHeading.html heading="Accessibility Insights for Web" level=3 %}

Accessibility Insights for Web is a Chrome extension built by Microsoft. It helps you look at headings, tab order, and color contrast in more intuitive ways than just a list of failures. You can use a visualizer for tab order (called
"Tab Stops") that will number the tab order as you hit the tab key, making it really obvious if something is out of place. It can also show you all of the headings on your page, which can help you catch bad heading order or  tell you if you don't have enough headings breaking up your content.

Lastly, its color tool lets you make your entire website greyscale, which can help you find not only color-contrast misses but also if you have content that requires color for its meaning - like fields that only indicate they are errored by turning red. I can't recommend this tool strongly enough.

Install it or learn more at the
[Accessibility Insights for Web Chrome Web Store page][a11y-insights-for-web].


{% include linkedHeading.html heading="Contrast Ratio" level=3 %}

Sometimes you just need a tool that tells you if two colors are WCAG contrast compliant, and Contrast Ratio does just that. You input two colors, and it will tell you whether the pairing is WCAG AAA compliant, AA compliant, AA compliant at certain sizes, or not compliant. It&apos;s one of my most used tools when I am designing a site!

Try it out at [contrast-ratio.com][contrast-ratio].



{% include linkedHeading.html heading="Accessibility Tools" level=2 %}

When working on web accessibility, you don't want to just use your tools to tell you if something is accessible or not - you want to try out accessibility tools that your users actually use to see if they are working as you expect!

Using a screen reader or other accessibility tools is going to give you so more information about the experience your actual users have than any tool can provide you, and it can also catch issues that automated tools might miss, especially in more dynamic interfaces.

{% include linkedHeading.html heading="NVDA and ChromeVox" level=3 %}

NVDA and ChromeVox are both screen readers, and I have used both of them to audit pages and to test if our screen reader users were getting the content we were trying to communicate via properties like `aria-live`.

ChromeVox is my day-to-day screen reader, as it&apos;s a Chrome extension that is easy to install and works on Linux (which is pretty rare). However, it&apos;s no longer maintained and can handle certain aria tags incorrectly.

NVDA, on the other hand, is a free screen reader for Windows, and it&apos;s my screen reader of choice when I want to test on a Windows machine. It&apos;s more popular and more maintained than ChromeVox.

Download NVDA or learn more at [the NVDA homepage][nvda]. Install or learn more about ChromeVox at [ChromeVox&apos;s Chrome Web Store page][chromevox].

{% include linkedHeading.html heading="ZoomText" level=3 %}

ZoomText is a tool that I actually heard about thanks to a user with low vision, who used it to change the color scheme of websites and to magnify the screen beyond the browser limit of about 500%.

It&apos;s really useful for making sure that your website properly handles different color schemes and for finding accessibility issues you might not find otherwise, like your links relying on color differences that are lost with a custom color scheme.

Download it or learn more at [ZoomText&apos;s homepage][zoomtext].


Have suggestions for a tool that you love that I should try out? [Tweet at me!][my-twitter]


<!-- All links for simplicity -->
[a11y-insights-for-web]: https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni
[chromevox]: https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en
[contrast-ratio]: https://contrast-ratio.com/
[html-codesniffer]: https://squizlabs.github.io/HTML_CodeSniffer/
[lighthouse]: https://developers.google.com/web/tools/lighthouse
[my-twitter]: https://twitter.com/viktor_koves
[nvda]: https://www.nvaccess.org/download/
[zoomtext]: https://www.zoomtext.com/
