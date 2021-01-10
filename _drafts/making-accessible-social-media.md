---
layout: post
title: "Making Accessible Content - From Social Media to Blog Posts"
---

Accessibility isn't just for websites - it's also integral for all of your content! Let's walk through some fundamental accessibility principles and how they apply to content like social media posts or articles on a blog.

## The Fundamental Principles

### Text Alternatives

For any type of content you create, you want to make sure there is some kind of text alternative for users who can't engage with your content in the way you may have initially planned. For example, if you're uploading a podcast or audio clip, it's important to caption your audio or provide a transcript if that's not possible. That way, your audience can engage with your content even if they are deaf or hard of hearing.

### Contrast

Whether it's the text in an article, some writing in an image, or even social media icons, you always want to make sure that your foreground and background content are compliant to the [WCAG contrast requirements][wcag-contrast-requirement], which you can check using a tool like [contrast-ratio.com][contrast-ratio] or with contrast checkers built into your browser or image editor. Now let's actually dive into how these principles apply to a few different types of content.

## Making Accessible Images

### Readable Text

If you're making images with text in them, you have to ensure any text in your images is compliant to the WCAG contrast guidelines. This is more complex in images than in a basic website, since your text could very well not be on a single color background. In this case, you should sample several spots near your text to ensure that the text is always sufficiently contrasting from the background. Let's take a look at an example.

Let's say we're making an image for a real estate company. We might start with something like this:

![Image of a suburban house with white text over it that is hard to read due to the image](/post-assets/content-a11y/img-text-poor-contrast.jpg)

You don't need to be an accessibility expert to look at that image and think "that text is hard to read!" With accessibility tools though, we can dig into how a contrast failure is specifically the issue here. If we grab use a color picker tool in an image editor or browser, we can grab the color at one point in the image and compare it to our text color, to see if the text is contrast compliant. Let's start with a place that should have decent contrast - the dark brownish gray garage door.

Indeed, if we put the color code of the text and the garage door into [contrast-ratio][contrast-ratio] we can see it's got great contrast!

![Screenshot of contrast-ratio.com showing dark brown (#5d4f46) has a sufficient contrast of 7.9 with white (#fffefb)](/post-assets/content-a11y/contrast-garage.jpg)

That doesn't mean we're in the clear yet though. As our intuition might tell us, there are points in this image where the background is far brighter, and that's going to cause contrast issues with our white text.

If we sample the color of the reflection of the white garage door frame (directly to the left of the first letter) we get a drastically different result:

![Screenshot of contrast-ratio.com showing light gray (#b4aca9) has an insufficient contrast of 2.21 with white (#fffefb)](/post-assets/content-a11y/contrast-curb.jpg)

This explains why the image looks unreadable! Although in some places our text is in front of a dark background and is contrast compliant, there are several points in the image where the text is blending into the background.

So how might we fix this? A simple semi-transparent black background will do the trick! Here's my basic correction:

![Image of a suburban house with white text over it that is easier to read thanks to a semi-transparent black background behind the text](/post-assets/content-a11y/img-text-good-contrast.jpg)

If we now sample that low-contrast area from before (the reflection of the white garage door frame to the left of the "T"), we get a new and improved result:

![Screenshot of contrast-ratio.com showing dark gray (#3a3635) has a sufficient contrast of 11.83 with white (#fffefb)](/post-assets/content-a11y/contrast-background.jpg)

That's some fantastic contrast! Just by adding a semi-transparent black layer, we darkened the main image enough so that our text has sufficient contrast everywhere, making it fully readable.

Keep in mind though that our intuition should not be our only guide here - the original image is a pretty egregious example, but there may well be images that look readable to someone with full color vision, but contrast checks fail. This indicates that users with certain forms of color blindness might have a hard time reading your text - so adjust your colors accordingly!

### Alternative (Alt) Text

Of course, ensuring text in our images is readable is critical, but does not do much good for blind users, who will be interacting with your images through a screen reader. To ensure that all of your audience can get the full intent of your images, make sure you use alternative text (alt text for short) to describe your image and any text it contains. If you're a developer making a website from scratch, you can do this with the `alt` attribute on an `img` tag, like so:

```html
<img alt="My superb alt text" src="...">
```

In most content systems like Wordpress, alt text is a separate field that you can provide when you're uploading images. If you do a quick Google search for the system you use and "alt text" it should come up!

To give a specific example though, what might be a good alt text for our image up above? You might think that the following alt text would be sufficient:

> The House of Your Dreams is Available Now!

But this doesn't communicate the image in the background, or the intent that image has! If, for example, the real estate firm serves a specific neighborhood (let's call it Gardenwood) and this house is from that neighborhood, we might want the following alt text:

> An idyllic two-story Gardenwood house - The House of Your Dreams is Available Now!

This alt text is a lot better because it actually describes the background image and not just the text we've placed on top of it. Of course, if that text is also adjacent to this image (say in the description of an Instagram post) the text becomes redundant, and we can just describe the image.

Keep in mind that alt text is very much context dependent, as the same image could be totally decorative (which means it should have no alt text) or be critical to understanding your content. I'd encourage you to read [WebAIM's article on alt text][webaim-alt-text] which goes into great detail on that subject!

#### Adding Alternative Text on Social Media

Unfortunately, it can be a bit more difficult to add alt text to images being posted to social media, and their interfaces can change pretty often. Instead of laying out how to do this here, I'll point you to some common social media site's guides on the subject, and encourage you to do some searches to find out! Most social media platform should explain how to add alt text in their help centers.

Here's a few social media platforms' guides to adding alt text:

- [Twitter's Alt Text Guide][twitter-alt-guide]
- [Instagram's Alt Text Guide][ig-alt-guide]
- [Facebook's Alt Text Guide][fb-alt-guide]

Keep in mind that most sites claim they automatically add alt text, and although this is technically true, the alt text is often pretty terrible. I was inspecting some Instagram alt text, and it will usually list the text in the image and maybe pull out that the photo contains a person. This auto-generated alt text also may switch up the order of your text, making it really confusing! So my main guidance - **always add alt text yourself!** You're going to have the best idea of the intent of an image and what it's trying to convey, and no amount of AI can replace that!

## Making Accessible Videos

### Contrast

Videos are, at their root, moving images, so the principles I gave above for ensuring text in images is readable also applies to video! If you have text in your videos (which is pretty common for marketing videos) you'll want to make sure that your text is contrast compliant and thus easy to read.

### Captioning

Of course, videos are not _just_ moving images - they also feature audio! This ties into one of the most important things when it comes to making accessible video content - _captioning_.

Most folks are aware of captioning, but there's a whole lot of expertise that goes into writing great captions! In particular, I'd highlight this fantastic [article on captioning from meryl.net][meryl-captions] which dives really deep into the art of making great captions. I'll just cover the basics.

First, **add captions to all your videos!** If you're not adding captions, you're locking out not only a huge community of deaf and hard-of-hearing users, but also folks who might be trying to watch your videos in public, like someone watching a video on a train. Lots of social media sites now also auto-play videos with the sound off and captions on - so having good, accurate captions can bring in more views!

Second, make sure your captions are clear and comprehensive. If you're video has multiple speakers, you want to make sure the captions clearly communicated who is speaking using the caption text or position. You also want to make sure to include elements that aren't speech, like sound effects. If, for example, your captioning a comedy show, it's really important you caption when the audience laughs - and maybe even how much! Otherwise, you're losing a lot of the background texture of a video that hearing users take for granted.

#### Caption Examples

![caption 1](/post-assets/content-a11y/caption-example-1.jpg)
![caption 1](/post-assets/content-a11y/caption-example-2.jpg)
![caption 1](/post-assets/content-a11y/caption-example-3.jpg)

### Captioning Videos for Social Media

#### YouTube, Vimeo, and Other Video Platforms

YouTube & Vimeo are two of the main video sharing platforms, but I would expect that almost any site where users exclusively share video is going to have some form of captioning functionality baked in. With YouTube, you can upload captions from caption files (which is what a professional captioner might provide you with), make captions yourself manually, automatically sync a transcript of a video to make captions, and correct YouTube's auto-captions.

Of course, manually captioning a video yourself is the best bet, but YouTube's automated captions can serve as a good _starting point_ if your audio was recorded in fairly high quality without too much background noise. I'd emphasize TODO. To learn more, check out [the YouTube Help caption and translation section][youtube-captions] which gives detailed instructions on how you can add captions with any of these methods.

If you're adding captions on Vimeo

### Instagram, Twitter, and Other Non-Video Platforms

Unfortunately, platforms that aren't as video

### Transcripts

As [WebAIM's article on captions][https://webaim.org/techniques/captions/] notes, transcripts are also a helpful alternative for multimedia content, including videos. Why might someone prefer a transcript? To quote that article:

> Screen reader users also may also prefer a transcript over real-time audio, since most proficient screen reader users set their assistive technology to read at a rate much faster than natural human speech.

When making transcripts, keep in mind that you should be providing all of the information contained in your video - audio and visual. Here's an example where a transcript that only includes audio might be really confusing:

> Speaker: And we're really excited about the price of our widget!
>
> [audience cheers]
>
> Speaker: Isn't that great?!

This transcript is missing some crucial information, and makes it hard to tell why the audience is cheering, which would be obvious in the original video. Take a look at an improved transcript, which makes it clear why the audience is cheering:

> Speaker: And we're really excited about the price of our widget
>
> [with a loud swoosh, presentation fades in to show "Starting at $9.99"]
>
> [audience cheers]
>
> Speaker: Isn't that great?!

I am by no means a captioning or transcript expert though, and if your company makes a lot of video content, hiring a firm to create captions and transcripts for your videos is probably a great idea - they'll have a lot of expertise built up over years of work that you likely won't be able to pick up in just a few hours of research.

[wcag-contrast-requirement]: https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast
[contrast-ratio]: https://contrast-ratio.com/
[webaim-alt-text]: https://webaim.org/techniques/alttext/
[twitter-alt-guide]: https://help.twitter.com/en/using-twitter/picture-descriptions
[ig-alt-guide]: https://help.instagram.com/503708446705527
[fb-alt-guide]: https://www.facebook.com/help/214124458607871?helpref=faq_content
[webaim-captions]: https://webaim.org/techniques/captions/
[meryl-captions]: https://meryl.net/captioned-videos-complete-guide/#synchronized
[youtube-captions]: https://support.google.com/youtube/topic/9257536?hl=en&ref_topic=9257610
