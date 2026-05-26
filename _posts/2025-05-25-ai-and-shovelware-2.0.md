---
layout: post
pageClass: 'content-limiter -page -no-padding-top'
title: Anyone Can Make Software Now. So Why's It Mostly Dangerous Crap?
excerpt: Agentic coding tools have brought AI smashing into the software industry, but despite a year of waiting, there hasn't been a corresponding rise in the quality of software. Welcome to the era of Shovelware 2.0
skipPostTitle: true
metadata:
  image: https://viktorkoves.com/post-assets/ai-shovelware/ai-shovelware-social.jpg
  description:
    Welcome to Shovelware 2.0
stylesheets:
 - articles/ai-shovelware.css
---


<div class="header">
  <picture>
    <source media="(min-width: 800px)" srcset="/post-assets/ai-shovelware/shovelware-header.svg">
    <img src="/post-assets/ai-shovelware/shovelware-header-mobile.svg" alt="">
  </picture>
  <div class="text content-limiter">
    <h1>
      <div class="line-1">Anyone Can Make Software Now.</div>
      <div class="line-2">So Why's It Mostly Dangerous Crap?</div>
    </h1>

    <div class="subtitle">Welcome to Shovelware 2.0</div>
  </div>
</div>

<p class="intro-note">
  <strong>Author's note:</strong> In the spirit of fairly critiquing AI and practicing a suggestion I end the article with, this article and the accompanying illustration were created entirely without AI assistance.
</p>

Agentic coding AI is here, and it’s transforming the software industry. But with agentic coding out now for over a year, has it felt like the software industry has really transformed? From my  from vantage point, although there are some really cool projects that have been built only because of new agentic coding tools, it generally feels like we’re awash in a sea of software slop. Tim Kadlec wrote a great article, [“Losing Focus”](https://timkadlec.com/remembers/2026/05/losing-focus/), that really resonated with me, especially this quote:

> “I don’t think the quality of software has increased all that much in in the past 12 months. I think maybe the amount of software has, but it’s very, very hard to find software that’s reliable.” - Max Scoening, Head of Product at Notion

I’ve been hearing loads of stories and murmurs about AI from the people I know in tech, and I think there’s a lot being lost in the binary divide that a lot of people seem to fall into - either AI is bad and can do nothing right, or AI is the new future of engineering, and every company should have all their code written by AI *today*.

I want to posit that right now we’re in the messy middle. An era of hype and grifters that want to sell you an AI fantasy that hasn’t been reached, which obscures the real present - powerful AI tools that can speed up professional developers, but can lure non-developers into shipping products that aren’t nearly ready for prime-time.

## My Background

But first, if you don’t know me, let me explain why you should listen to my perspective. I’ve been working professionally in software (specifically web development, focused on the frontend), for over ten years. In that time I’ve worked at a non-profit, a for-profit, led a small startup, freelanced, and have led a number of open-source volunteer teams at [Chi Hack Night](https://chihacknight.org), including right now working on [ElectrifyChicago.net](https://electrifychicago.net).

I have a *lot* of experience with AI. I started with Gemini chat for coding help years ago now, have used a number of AI code review tools, and have been using Claude Code for over a year. So I am absolutely not coming into this conversation as a skeptic - I use AI day-to-day in my work, and I know that it *can* be powerful, but that it can also make terrible code that would never pass even a basic review, whether because it's full of duplication, is hiding bugs, or any number of other issues. Before we get to that, though, let’s start with the positive side of all these agentic coding tools.

## The Good - The Personal Software Revolution Has Arrived

Agentic coding has come with some real upside. When simple software becomes incredibly fast and cheap to produce means you can make bespoke, personal applications, to solve problems that are so specific that it wouldn’t justify a firm spending resources on making it. The Verge’s David Pierce has covered this really well, and termed this moment, the personal software revolution, in [“You can make an app for that”](https://www.theverge.com/tech/928905/vibe-code-personal-software-revolution).

When anyone can make bespoke software, you can make an application just because the existing software ecosystem doesn’t solve your exact problems. For me, that looked like creating my own [bulk image compression tool](https://viktorkoves.com/tools/img-compressor), because I had accidentally photographed a whole vacation in a jpg high quality format that left me with 5 gigabytes of images from just a two day trip. When I looked for existing compression solutions, however, they all removed the EXIF data that’s key to backing up images (especially as a photographer) since it contains the time that the image was actually taken. Without the EXIF data, all the images would show as being “created” the moment that they were converted, and I’d have none of camera settings that were used for each image!

Before agentic coding tools, I definitely wouldn’t have dedicated the hours and hours of time that it would have taken me to look into how to do image compression client-side, set up a UI, and more. But with Claude, I just explained what I wanted and got a basic starting point, and then integrated and refined the site until it did exactly what I wanted.

However, this actually reveals something critical about using AI coding tools - **you have to have a clear product vision.** I was only able to build the bulk image tool that I was looking for because I had a very specific, narrow, product need, and knew exactly how I wanted it to look and behave. Without that vision, Claude could build *something*, but nothing close to the tool I built, and it wouldn’t be nearly as useful. I had really strong opinions on how I wanted the loading state to be handled, how I wanted the UI to look, and extra features (like a four image preview to test quality settings before committing to a 500 file conversion) that Claude wouldn’t ever have come up with. Put another way, Claude alone would have built something *usable* but not something *great*.

One last point on that image compression tool example - my use of Claude here didn’t require technical expertise (I didn’t look at the code very much at all) but that is only because the tool itself is small, discrete, in an isolated codebase, and I don’t need to maintain or update it. If I was trying to expand this tool to be a paid product, let's say, I’d want to think really carefully about the engineering decisions and the architecture to make sure it was ready for future growth.

In the open source world, Claude has also had some huge benefits, but in that realm I’ve already personally started to see the downsides. I’ve seen friends take existing open data and build really cool tools, like my friend Michael McLean and his [Chicago Crash Dashboard](https://www.strongtownschicago.org/chicago-crash-dashboard). On the other hand, with [Electrify Chicago](https://electrifychicago.net/), we’ve had a few collaborators open completely AI generated pull requests that they likely hadn’t even reviewed, which I then had to send back with a ton of feedback, because Claude wasn’t reusing variables or architecting code in a reusable way. On the more positive side, we have a lot of Python scripts that do really basic data analysis and computation on building data for Electrify Chicago, and agentic coding tools can do a great job at handling improvements to those jobs. Simply tell Claude “I’d like to calculate the buildings that didn’t report each year by ward, make sure to add unit tests”, point it at the current files, and it can generally make a pretty sound script, which would have taken a contributor a while to make. It still can require a good bit of steering to make sure the code is well isolated and not overly verbose, though.

## The Bad & The Ugly - Same Shovelware, Prettier Skin

Now let’s talk about *the slop,* the shovelware, or whatever you want to call the glut of AI generated software. I want to recount a few stories that I think tell the story of the dangerous moment that we’re in, with software being shipped by people who don’t understand the risks of what they’re doing.

On the most extreme end, inexperienced practitioners can use AI tools without even basic guard-rails, resulting in scenarios like happened to car rental company PocketOS just a month ago. Their whole database was wiped out by an AI agent ([Claude-powered AI agent’s confession after deleting a firm’s entire database: ‘I violated every principle I was given’ - The Guardian](https://www.theguardian.com/technology/2026/apr/29/claude-ai-deletes-firm-database)). As PocketOS’ founder Jeremy Crane puts it:


> The AI industry is “building AI-agent integrations into production infrastructure faster than it’s building the safety architecture to make those integrations safe”.

I think there are actually two problems with this story - Crane frames the issue as Claude not following rules, but that fundamentally misunderstands how LLM based agents work - **today’s AI agents do not follow rules, they ingest rules as suggestions**. As someone who works with Claude day-to-day, the number of times it just ignores an explicit request is too many to count. The real issue, by my reading, is entrusting dangerous engineering capabilities (production database access) to non-engineers, who don’t know the safeguards necessary to properly protect customer data. It should take multiple intentional steps to access a writable copy of production data, and backups should be happening at such a high frequency that even a large deletion should be recoverable with only minor loss. In this case, however, Claude also deleted the backups, making the business fall back on a *three month old backup.* If that level of system failure happens in a lot of companies, I'd be willing to bet that the executive responsible for that oversight would be fired.

The paradox is that non-engineers can now build applications that *look* like production technologies, but when you dig under the hood, they are a sloppy mess. Like an amateur electrician who knows enough to get a light to turn on, but not enough to calculate power draws and run the right gauge of cable, you might not notice at first that the work is bad. Then, a few weeks, months, or years later - the temperature in your house runs a little high, you plug in a few too many devices, and the bad workmanship results in a catastrophic fire.

Funny enough, bad code made in bulk isn’t actually new, and we’ve had a term for it - [shovelware](https://en.wikipedia.org/wiki/Shovelware). Shovelware was coined in the 90s for software that was all about quantity, not quality - like re-bundling DOOM levels to sell on CDs at a flea market. I think our current AI moment is very similar. Everyone’s showing off AI apps they made very quickly, but you spend more than a few minutes with them, and they are nonsensical and full of bugs, because they lacked care and thoughtfulness. That part isn’t the fault of AI - quick sloppy projects are always like that, no matter who (or what) writes the code. Ad agencies often make throwaway sites for marketing launches that might be similarly frail and not maintainable. But the catch is **the quality of the code only doesn’t matter *if the software itself isn’t the product.***

If you are a restaurant with a hastily made static menu website that has security or performance issues, that's not really a huge problem. Your site doesn’t store any user data (and so isn’t a likely target for cyber-attacks or DDOS attacks), and the menu *itself* isn’t the business. You can literally afford downtime! On the other hand, that same restaurant would never tolerate downtime in their payment system. For a company making payment software, *the software **is** the product*, and so uptime, security, and maintainability are as vital (if not even more so) than just having a working product.

That’s the tricky thing with AI - it is tempting to say that the code doesn’t matter, but the instant the code has to be updated or maintained (even by agents), it's important. I don’t care that my one off bulk image compressor has clean code because it works and I will probably never touch it again. If it has a big issue, I’ll throw it away and rewrite it all! But if you are building production software for a software business, only evaluating the output means that you may be hiding tech debt or bugs that you don’t understand, and future work by people or agents might stumble and fall into an ever growing pile of spaghetti code.

There’s another factor to consider too - AI builds upon the existing paradigms within a code base. If you are hands off and start an AI project and never look at the code, and it has bad practices, the AI will never stop and tell you to refactor. Even worse, it’ll see the sloppy patterns in your code and copy them. Like a house built out of rotten planks, but covered in shiny paint, it might look good at first blush, but when you try building a second story on top (out of even more rotten planks, potentially), the house is bound collapse.

In the real world, that might look like a database structure that isn’t optimized that will take hours or days of downtime to migrate, locking in out of date packages that have security vulnerabilities or aren't being updated, or duplicating code so that later updates become much more costly. Don’t be fooled - even if humans never have to look at the code **the code still matters.** AI tools make mistakes just like people do, and we created code review processes to catch code issues from developers, as well as QA to validate functionality, and AI tools need the same.

## The Very Bad - AI Incentives & Token Maxxing

As I was writing this, I watched a video that I thought was worth mentioning - a clip from Linus Tech Tips’ podcast, the WAN show, “[Amazon Employees Are Faking Their AI Usage](https://www.youtube.com/watch?v=Mhm1C76GhoU)”. In this part of the show, they discuss a recently covered phenomenon at Amazon, where developers are being pushed so hard to use AI (including with a token leaderboard), that they ended up creating bots to consume AI tokens (see also [Amazon employees are doing fake tasks because they're forced to use more AI and show it - Digital Trends](https://www.digitaltrends.com/cool-tech/amazon-employees-are-doing-fake-tasks-because-theyre-forced-to-use-more-ai-and-show-it/)). Here’s an excerpt from the article:

> “According to a new Financial Times report, Amazon employees are using the company’s internal AI tool called ‘MeshClaw’ for unnecessary tasks simply to inflate their AI usage scores and appear more aligned with the company’s growing AI-first culture.”

As a developer, this doesn’t surprise me. Developers are smart people tasked with automating problems and being efficient with their time, and although most can definitely see a benefit from using AI, that benefit doesn’t scale infinitely. If you want your organization to use AI to grow faster or ship features faster, you have to use metrics that actually measure what you care about, are grounded in data, and can’t be so easily gamed. Amazon could have, for example, suggested developers use AI more to ship features 10% faster - a goal that’s much more measurable and harder to game, and then could examine AI usage to see if it’s helping meet those targets. You could also set general daily usage targets, like setting goals around expecting engineers to try using AI on every task, and making sure that AI usage hits some baseline. But ultimately, AI usage isn’t the *goal* of any organization, and incentivizing crude metrics like this will lead to crude outcomes that don't benefit customers.

It’s also worth mentioning that wasting tokens like this and using AI frivolously isn’t free - both directly in financial terms, and indirectly in costs to our grid, our water supply, and our planet more broadly. There’s not a lot of great data on AI emissions and energy uses, but carbon credit company CNaught, in their article [How Much Carbon Does AI Actually Use? And Why It's So Hard to Find Out](https://www.cnaught.com/blog/how-much-carbon-does-ai-actually-use-and-why-its-so-hard-to-find-out), had this interesting call-out:

> “Software engineer Simon Couch recently analyzed his own Claude Code usage and found that a median coding agent session consumed approximately **41 Wh** (138 times more than a typical chat query). On a typical workday running multiple coding agents simultaneously, his estimated energy consumption reached **1,300 Wh**, equivalent to roughly 4,400 chat queries.”

They also point out that smarter models consume more energy and have higher emissions, noting:

> “The newest ‘reasoning’ models like OpenAI's o1 series… can use 50-100x more energy than standard queries. A research paper… found that ‘smarter’ LLMs produce up to 50x more carbon emissions than simpler models”

I think AI’s environmental impact has been pretty heavily discussed, but I think that missed in that conversation is that AI is just like any use of computers, from hosting a website to browsing Netflix. Running computers requires energy and creates emissions, and we should use it judiciously to achieve valuable goals. You can use an expensive AI model to build a website that helps reveal hidden oil and gas emissions, or to track novel diseases, or you can use it to burn tokens to go up on an internal Amazon leaderboard. Even if these had equivalent emissions, I think they are clearly ethically distinct.

## Side Note - The AI Cost Hazard

One aside I wanted to mention - one of the other murmurs I have been hearing about is the potential increase in AI costs, like in the article [You're about to feel the AI money squeeze](https://www.theverge.com/ai-artificial-intelligence/917380/ai-monetization-anthropic-openai-token-economics-revenue) from Hayden Field at The Verge.

A lot of large companies have been blowing through AI budgets, with Uber noting that they burned through their coding tools budget in four months ([Uber Burns Its 2026 AI Budget In Four Months On Claude Code - Forbes](https://www.forbes.com/sites/janakirammsv/2026/05/17/uber-burns-its-2026-ai-budget-in-four-months-on-claude-code/)), and Microsoft discontinuing Claude code licensing and pivoting to their own GitHub Copilot. These changes come _without_ any dramatic increase in token costs, and there's a lot of reason to expect that as AI companies seek to move into profitability as they look towards IPOs, they will raise token costs to make sure that they aren't losing money on any of their customers.

I don't think I can speak definitely on this issue, however. AI tools have evolved extremely rapidly, with distillation leading to smaller, leaner, models that can run locally, and it's quite possible that a new player or new model will appear that offers a better middle-ground on cost and performance.

## So What Do We Do?

So what’s a safe approach to using AI? It's actually pretty simple - hire professionals to use AI with safeguards, and treat it like a tool with benefits, drawbacks, and costs. Don't treat it like an infallible magic machine that can solve all your business' problems.

First, **AI does not eliminate the need for a clear and precise product vision**. If you want to build a copy of something that already exists (like the classic demo of a basic snake game) AI will do great. But if you want to solve a novel problem for your specific customers, you need to have research and a clear product vision to guide you. Otherwise, as the old software adage goes, garbage in garbage out.

Second, **if you can’t evaluate the code, in a professional environment, you shouldn’t ship the product**. It’s one thing if you vibe coded your personal website (you’re not storing user data, and you’re not charging money for it), but a production application is a whole different can of worms. I heard a story from a friend that someone non-technical they knew had vibe coded an application, and said:

> “I’ve built out my whole application, but I don’t know how any of it works.” - Anonymous founder

To me, a **non-technical founder building their whole app with AI means they haven't built a product, they’ve built a liability**. If you do not understand the underlying pieces of the application you are shipping, you don’t even know what you don’t know - you likely don’t have the technical expertise to consider or validate the security, accessibility, or scaling concerns of a production application, and if it blows up it may well leave you with a huge lawsuit and legal liability when you lose customer’s money or their sensitive data.

Third, and perhaps most controversially - **I think every engineer should practice coding without AI.** I’ve noticed my muscle memory for different techniques and functions slipping away as I rely on AI tools more, but my coding expertise and knowledge *is still valuable*. I need to know the different JavaScript array functions and the CSS display properties to *evaluate* code, even if not to write it whole cloth, but just like an unused muscle rapidly atrophies - so do our unused skills.

We’re in a complicated moment right now, and I think as an industry and as a society we’re still figuring out the norms and best practices around agentic coding. With AI, anyone can code - but just like anyone *can* do electrical work, that doesn’t mean anyone should. You don’t want your business to be the house that burns down.
