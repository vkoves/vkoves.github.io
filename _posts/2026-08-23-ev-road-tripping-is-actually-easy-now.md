---
layout: post
title: "EV Road Tripping Is Actually Easy Now!"
skipPostTitle: true
excerpt:
  When people talk about going electric, they are often concerned about road tripping. I'm here to
  show you that modern EVs can tackle a road trip incredibly well - here's what a real 950-mile
  drive from Chicago to Mammoth Caves actually looked like.
metadata:
  image: https://viktorkoves.com/post-assets/ev-roadtrip/ev-roadtrip-social-image.png
  description:
    If you haven't driven electric before, a road trip might sound impossible - but I want to tell
    you about driving from Chicago to Kentucky to Mammoth Caves.
stylesheets:
 - articles/ev-road-trip.css
scripts:
 - articles/ev-road-trip.js
---

<div class="all-posts-cont">
  <a href="/writing" id="all-posts" class="red-button">Back to All Writing</a>
</div>

<h1 class="page-title">EV Road Tripping Is Actually <em>Easy</em> Now!</h1>

<p class="post-subtitle">A 950-Mile EV Road Trip From Chicago to Mammoth Caves</p>

<p class="post-date">Published {{ page.date | date: "%B %d, %Y" }}</p>

When people talk about going electric, they are often concerned about road tripping. You might
think, &ldquo;an EV might be fine for my daily commute, but can I still make a long road trip for a
summer vacation?&rdquo; I'm here to show you that modern EVs can tackle a road trip incredibly well,
especially with the ubiquity of charging infrastructure in the US in 2026.

<details class="table-of-contents">
  <summary>Table of Contents</summary>

  <nav aria-label="Table of contents">
    <ul>
      <li><a href="#the-vehicle">The Vehicle - The Hyundai Ioniq 5!</a></li>
      <li>
        <a href="#the-trip">The Trip</a>
        <ul>
          <li><a href="#chicago-start">Day 1: Departing Chicago</a></li>
          <li>
            <a href="#charging-day1">Charging Stops</a>
            <ul>
              <li><a href="#finding-charging-stops">How Do You Find Charging Stops?</a></li>
              <li><a href="#day1-stop1">Stop 1 - Ionna in Lafayette, Indiana</a></li>
              <li><a href="#day1-stop2">Stop 2 - Electrify America in Clarksville, Indiana</a></li>
            </ul>
          </li>
          <li><a href="#kentucky-arrival">Arriving in Kentucky</a></li>
          <li><a href="#mammoth-caves">Mammoth Caves</a></li>
          <li><a href="#kentucky-day2">Day 3: Leaving Kentucky</a></li>
          <li>
            <a href="#charging-day2">Return Charging Stops</a>
            <ul>
              <li><a href="#day3-stop1">Stop 1 - Pilot Flying J in Sonora, Kentucky</a></li>
              <li><a href="#lunch-lexington">Lunch in Lexington</a></li>
              <li><a href="#day3-stop2">Stop 2 - Pilot Flying J in Waddy, Kentucky</a></li>
              <li><a href="#day3-stop3">Stop 3 - Electrify America in Indianapolis</a></li>
              <li><a href="#day3-stop4">Stop 4 - Ionna in Lafayette, Indiana</a></li>
              <li><a href="#day3-stop5">Stop 5 - Electrify America in Rosemont</a></li>
            </ul>
          </li>
          <li><a href="#chicago-return">Back in Chicago</a></li>
        </ul>
      </li>
      <li>
        <a href="#final-costs">Our Final Costs &amp; Time</a>
        <ul>
          <li><a href="#costs-to-compare">Some Costs To Compare</a></li>
          <li><a href="#cost-caveats">Caveats / Why It Was So Expensive</a></li>
        </ul>
      </li>
      <li><a href="#what-it-felt-like">What It Actually Felt Like</a></li>
      <li><a href="#renting-tips">Tips For Renting An EV</a></li>
      <li>
        <a href="#getting-into-an-ev">Getting Into An EV</a>
        <ul>
          <li><a href="#know-your-usage">Know How You Use Your Car</a></li>
          <li><a href="#used-market">Look At The Used Market!</a></li>
          <li><a href="#level-2-at-home">Don't Think You Need A Level 2 Charger At Home</a></li>
          <li><a href="#rebates">Check for Rebates</a></li>
          <li><a href="#talk-to-an-owner">Talk to An Existing EV Owner</a></li>
        </ul>
      </li>
      <li><a href="#wrapping-up">Wrapping Up</a></li>
      <li>
        <a href="#appendix">Appendix</a>
        <ul>
          <li><a href="#terminology">Terminology</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</details>

## What I'll Cover {#what-ill-cover}

- How do you find charging stations?
- How long does charging take?
- How much does charging an EV cost?
- What should you know before renting or buying an EV?

## The Vehicle - The Hyundai Ioniq 5! {#the-vehicle}

For this road trip, I was driving a 2023 Hyundai Ioniq 5 SEL AWD, with a 77.4 kWh battery.

<img src="/post-assets/ev-roadtrip/ioniq5-main.webp" loading="lazy"
    alt="A matte grey 2023 Hyundai Ioniq 5 at an Ionna charging station on a sunny day">


The Ioniq 5 is a very capable but budget-friendly EV - here's some quick facts:

- **Starting Price of ~$37,000 New** - starting at $45,000 for the long-range version
- **Charges 10% to 80% in About 20 Minutes**
- **Has an EPA-Rated Range of up to 318 Miles** - in a mix of city and highway driving

Since I was driving a 2023 long-range all-wheel drive model, it has a 266-mile EPA range rating.
The newer model years have a larger battery for the long-range model, and rear-wheel drive models
have that 318-mile range I mentioned above.

<div class="notice">
  <strong>Important Note: Road Tripping Isn't Where EVs Save You Money!</strong>

  <p>
    The purpose of this article is to show you that road-tripping in an EV is easy and doesn't take
    up a lot of time, but I'll also be sharing the costs to be transparent. But I want to note
    upfront that a big way EVs save you money is from the cost of electricity vs gas, which comes
    from <em>home charging</em>. Fast chargers are expensive equipment with expensive high-powered
    grid connections, and you pay a premium to use them. Most of the time though, you can just plug
    in at home, and pay a quarter or a sixth of what I paid at most fast chargers.
  </p>

  <p>
    <strong>Plus, EVs also save you money on maintenance</strong> - they've got no transmission, no
    oil changes, and dramatically less brake wear thanks to regenerative braking!
  </p>
</div>

## The Trip {#the-trip}

Let's get started! I've made a little progress bar to follow along on our journey.

<!-- Vue 3 CDN: loaded synchronously so it's available when the deferred component script runs -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<!-- Sentinel used by ev-road-trip.js to detect when #trip-progress becomes stuck -->
<div id="trip-progress-sentinel"></div>
<div id="trip-progress"></div>


## Day 1: Departing Chicago {#chicago-start}

We started our adventure at the Budget location at O'Hare airport, where we picked up our matte
grey 2023 Hyundai Ioniq 5 SEL AWD EV.

I was very excited to get an Ioniq 5, but there was one problem - due to a mixup at the rental
place, they pointed us to a parking spot where they had chargers, and they had likely moved the
car we were _supposed to get_ out and swapped it with a car that needed a charge.

<div class="image-grid -two-col">
  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/ioniq5-at-rental.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/ioniq5-at-rental.webp" loading="lazy"
        alt="The Hyundai Ioniq 5 in the rental parking garage, plugged in next to a red Tesla Model Y">
  </a>

  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/ioniq5-initial-charge.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/ioniq5-initial-charge.webp" loading="lazy"
        alt="The Ioniq 5 dashboard showing a low 18% state of charge with 40 miles estimated range">
  </a>
</div>

I'll cover some tips on renting later on, but I was prepared - I've rented EVs a lot from the
O'Hare, and knew that there's an Electrify America fast-charging station in Rosemont at
the Fashion Outlets Mall, just a few minutes and a few miles away from O'Hare. So we drove over
there, plugged in the car, got some coffee and used the bathroom, and 27 minutes later were back on
our way!

<div class="image-grid -two-col">
  <a class="image-link -in-grid"
      href="/post-assets/ev-roadtrip/day1/rosemont-day1-charging-speed.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/day1/rosemont-day1-charging-speed.webp" loading="lazy"
        alt="The Ioniq 5 dashboard display showing a 16% SOC, a 43 kW current charging rate, and
        estimated remaining times of 17 minutes to 80% and 47 minutes to 100%.">
  </a>

  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/day1/rosemont-day1-receipt.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/day1/rosemont-day1-receipt.webp" loading="lazy"
        alt="Display screen on an Electrify America charger showing 27 minutes of charging time,
        $34.49 cost, 61.7283 kWh energy delivered, and a 92% state of charge.">
  </a>
</div>

## Charging Stops {#charging-day1}

Now that we had a full charge in Rosemont (92%), we were ready to drive to Kentucky! From Rosemont,
our hotel in Munfordville, Kentucky is a 400-mile drive, and we only needed to stop to charge twice!

Now, you might be thinking - if the Ioniq 5 we were driving had a 266-mile EPA range, why did we need
to stop twice? That's because an EPA range is a mix of city and highway driving, and so exclusively
driving on a highway, EVs usually have a roughly 30% range penalty. In my experience, this 2023
Ioniq 5 SEL AWD got a 200-mile highway range, so to safely make a 400-mile journey (especially since
you rarely recharge an EV fully to 100%) and have charge when we got the hotel, we needed to stop
twice.

As you'll see though, with a modern EV (especially an 800-volt car like the Ioniq 5) charging stops
are really no problem - and we usually needed to eat or use the bathroom anyway! By the time we were
ready to go, the car was ready to go nine times out of ten.

### How Do You Find Charging Stops? {#finding-charging-stops}

To find charging stops, I used [A Better Route Planner](https://abetterrouteplanner.com), which is
widely regarded as the best app for planning out longer road trips - you put in what car you have,
its state of charge, and your destination, and it'll plan out what stops you need to make to get
to your destination with your desired state of charge! Here's a screenshot of a plan it drew up
from Rosemont to Mammoth Caves:

<a class="image-link -full-width" href="/post-assets/ev-roadtrip/a-better-route-planner.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/a-better-route-planner.webp" alt="A map on A Better Route
    Planner displaying an EV route from Rosemont, Illinois, to Mammoth Cave National Park. The side
    panel shows a total travel time of 7 hours and 10 minutes over 669 km with two charging stops: a
    12 minute stop at an IONNA station in Lafayette, Indiana, and a 12 minute stop at a ChargePoint
    station in Shepherdsville, Kentucky.">
</a>

### Stop 1 - Ionna in Lafayette, Indiana {#day1-stop1}

143 miles from Rosemont at 4:48pm Eastern, we ended up at a brand new Ionna charging station in
Lafayette, Indiana with still 22% charge left. This station
[opened in late June](https://www.wlfi.com/2026/06/24/wawa-lafayette-holds-grand-opening), just a
week before we got there on July 1st.

[Ionna](https://en.wikipedia.org/wiki/Ionna) is one of the newest charging providers, started in
February 2024 and [opening their first location in February 2025](https://www.electrive.com/2025/02/05/usa-ionna-officially-opens-first-charging-station/).

Because they had just opened, Ionna actually had a 20 cent/kWh deal, and we only paid $14.05 for
that full charge - talk about a deal! Even if gas was let's say $3 a gallon in Indiana (I didn't
get a photo of gas prices nearby, but in late July after more gas price rises, $3.50 was in the
area), that's ~4.7 gallons of gas, only enough for 117 miles in a car of average gas mileage (25 mpg).

We ended up charging for 42 minutes in Lafayette, but that's not because the car needed to - if we
were really rushing, we'd hit 80% and keep going, since all EVs (and all battery-powered devices)
dramatically slow down their rate of charge over 80%. But since we were eating a late lunch at the
attached Wawa, we just ate our meal and came back to a fully charged car!

<a class="image-link" href="/post-assets/ev-roadtrip/day1/ionna-lafayatte-day1-receipt.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/day1/ionna-lafayatte-day1-receipt.webp" loading="lazy"
      alt="Display screen of an Ionna EV charging station showing a completed charging session at
        99% state of charge, 65.6 kWh delivered in 42 minutes, and a total cost of $14.05.">
</a>

### Stop 2 - Electrify America in Clarksville, Indiana {#day1-stop2}

At 8:25pm Eastern, 171 miles from our charging stop in Lafayette, we ended up at an Electrify America station in
Clarksville, Indiana with 26% charge left - we stopped in the Walmart, used the restroom, and ate
some food, and the car got 97% charged, in 33 minutes! Similar to before, we weren't waiting on the
car, and from 27% to 80% the car itself estimated it would take only 16 minutes to charge - but we
had to eat!

<a class="image-link" href="/post-assets/ev-roadtrip/day1/electrifyamerica-day1-receipt.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/day1/electrifyamerica-day1-receipt.webp" loading="lazy"
      alt="Screen of an Electrify America charging station showing a completed charging session at
        97% state of charge and 59.7 kWh delivered over 33 minutes, and a total cost of $30.88">
</a>

## Arriving in Kentucky {#kentucky-arrival}

After a 78-mile drive, we then got to our hotel at 9:38pm Eastern time with 68% charge - plenty for
our adventures! You might notice that's a pretty large range drop for that distance, but I was
probably driving a little faster than before, since we had plenty of charge to get back to the hotel.

**Pro Tip - Speed is a huge factor in EV range!** Gasoline is incredibly energy dense, so we often
don't realize just how much leeway it gives us. For context, one gallon of gasoline is equivalent to
33 kWh of energy ([source](https://en.wikipedia.org/wiki/Gasoline_gallon_equivalent#Gasoline_gallon_equivalent_tables)), which means our Ioniq 5, with its
77.4 kWh battery, was carrying the energy equivalent of just 2.3 gallons of gas, but it can go
nearly 270 miles on that amount of energy! That's the equivalent of a _whopping 115 MPG_.

## Mammoth Caves {#mammoth-caves}

During the day, we drove 22 miles from our hotel to the cave visitor center and then 22 miles back,
and ended the day at 51% charge. No charging was involved, but since that was the point of this
whole road trip, here's a few fun photos!

<div class="image-grid -three-col -match-heights">
  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/mammoth-3.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/mammoth-3.webp" loading="lazy"
        alt="A stone sign reading 'Mammoth Cave National Park Visitor Center' in front of the park's
          visitor center building.">
  </a>

  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/mammoth-1.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/mammoth-1.webp" loading="lazy"
        alt="Illuminated orange stalactites and flowstone formations inside Mammoth Cave.">
  </a>

  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/mammoth-2.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/mammoth-2.webp" loading="lazy"
        alt="Looking out from inside the dark cave toward a sunlit, forested cave entrance.">
  </a>
</div>

## Day 3: Leaving Kentucky {#kentucky-day2}

We had to make a detour on our way back home to visit a friend in Lexington, which would add 100
miles to our journey back. Since the car was at half charge and Lexington was 110 miles away, it
would have been possible to make it to Lexington, but we would have had very low charge, so we
looked for the closest charger to our hotel. Turns out even in Kentucky, there was a fast charger
just 17 miles away!

## Return Charging Stops {#charging-day2}

### Stop 1 - Pre-Trip Top Up at Pilot Flying J in Sonora, Kentucky {#day3-stop1}

As mentioned above, there was a charger just 17 miles away from our hotel, just a short drive away.
This was a Pilot Flying J truck stop in Sonora, Kentucky, and we made a very short stop - since we
arrived with 43% charge, in just 14 minutes we charged to 86% for a cost of $26.23.

<a class="image-link" href="/post-assets/ev-roadtrip/day3/pilot-flyingj-1-sonora-day-3-receipt.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/day3/pilot-flyingj-1-sonora-day-3-receipt.webp" loading="lazy"
      alt="Digital screen of a Pilot Flying J GM Energy EV charger displaying a finished session
      reaching 86% state of charge, delivering 35.8 kWh in 14 minutes and 36 seconds for a total
      cost of $26.23.">
</a>

### Lunch in Lexington (110mi from Sonora) {#lunch-lexington}

Next up, our detour - no charging involved, but we drove over to Lexington to meet a coworker,
eating up 110 miles - we still had plenty of charge in town (around 40%), but that meant we'd need
to make another stop somewhat shortly.

### Stop 2 - Pilot Flying J in Waddy, Kentucky {#day3-stop2}

After a nice ride through some countryside to check out some horses, 36 miles away from Lexington
we got to a Pilot Flying J in Waddy, Kentucky. We charged for 18 minutes, getting from 24% to 82% for
$36.16.

<a class="image-link" href="/post-assets/ev-roadtrip/day3/pilot-flyingj-2-waddy-day-3-receipt.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/day3/pilot-flyingj-2-waddy-day-3-receipt.webp" loading="lazy"
      alt="Digital screen of a Pilot Flying J GM Energy EV charger showing a completed session at
      82% state of charge, delivering 49.4 kWh in 17 minutes and 52 seconds for a total cost of
      $36.16.">
</a>

### Stop 3 - Electrify America in Indianapolis {#day3-stop3}

146 miles away from our last stop, we got to an Electrify America station on the Southern end of
Indianapolis (technically in Beech Grove). Since I knew that further North were the new Ionna
stations with discounted charging, I specifically stopped for as short a time as possible. We
arrived with 19% charge, but **only stayed for 13 minutes**, getting us 65% charge to get to our
next stop, for $22.92.

<div class="image-grid -three-col -match-heights">
  <a class="image-link -in-grid"
      href="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-indianapolis.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-indianapolis.webp" loading="lazy"
        alt="A row of white Electrify America chargers along the edge of a sunny Walmart parking lot,
          with a silver Kia Niro and the grey Ioniq 5 plugged in side by side and a Polestar EV
          charging further down the row.">
  </a>

  <a class="image-link -in-grid"
      href="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-final-charge.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-final-charge.webp" loading="lazy"
        alt="The Ioniq 5's dashboard display reading 5:52 PM on Thursday, July 2, showing the battery
          at 65% with 154 miles of range remaining.">
  </a>

  <a class="image-link -in-grid"
      href="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-indianapolis-receipt.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-indianapolis-receipt.webp"
        loading="lazy" alt="An Electrify America receipt from the Walmart in Indianapolis, Indiana,
          showing a 12 minute 45 second session at $0.60 per kWh that delivered 38.2 kWh to a 65%
          state of charge at a maximum speed of 190 kW, for $22.92 plus $1.60 sales tax - a total
          of $24.52.">
  </a>
</div>

### Stop 4 - Ionna in Lafayette, Indiana {#day3-stop4}

Back at Ionna Lafayette, IN - 35% to 100% for $11.58 in 35 minutes. This was thanks to the
20 cents per kWh sale for this brand new station, and since we were eating dinner, we ended up
letting the car fully charge. So this was a longer charging stop, but not because of the car!

<a class="image-link" href="/post-assets/ev-roadtrip/day3/ionna-day3-receipt.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/day3/ionna-day3-receipt.webp" loading="lazy"
      alt="Display screen of an Ionna EV charging station showing a finished session at 100% state
        of charge from 35%, 54.1 kWh delivered in 35 minutes, and a final cost of $11.58.">
</a>

### Stop 5 - Electrify America in Rosemont {#day3-stop5}
**Only Because We're Renting**

Just one last stop, but only because this was a rental car! With this rental (and likely most) we
needed to return the car at over 70% charge, so after 143 miles of driving we ended up back at the
Electrify America Station in Rosemont at the Fashion Outlets that we started at. We arrived with
46% charge, and we charged up to 75% **in just 8 minutes** for $14.39!

<a class="image-link" href="/post-assets/ev-roadtrip/day3/rosemont-day3-receipt.webp"
    target="_blank" rel="noopener">
  <img src="/post-assets/ev-roadtrip/day3/rosemont-day3-receipt.webp" loading="lazy"
      alt="Screen of an Electrify America charging station showing a completed session, reaching 75%
        state of charge and 25.8 kWh delivered in 8 minutes for a total cost of $14.39.">
</a>

## Back in Chicago {#chicago-return}

And voila - it was just a few miles to the airport from Rosemont, and we were back in Chicago with
the rental car returned!

## Our Final Costs & Time {#final-costs}

Looking at the car's odometer, which started at 36,082 miles and ended at 37,034 miles, this road
trip covered a whopping <strong>952 miles!</strong> Let's break down what that cost us.

<div class="cost-table" markdown="1">

| Charging Stop | Charge | Energy | Cost | Cost/kWh | Time |
| --- | --- | --- | --- | --- | --- |
| Electrify America<br><span class="cost-table__location">Rosemont, IL</span> | 16% → 92% | 61.7 kWh | $34.49 | $0.56 | 27 min |
| Ionna<br><span class="cost-table__location">Lafayette, IN</span> | 22% → 99% | 65.6 kWh | $14.05 | $0.20 | 42 min |
| Electrify America<br><span class="cost-table__location">Clarksville, IN</span> | 26% → 97% | 59.7 kWh | $30.88 | $0.52 | 33 min |
| Pilot Flying J<br><span class="cost-table__location">Sonora, KY</span> | 43% → 86% | 35.8 kWh | $26.23 | $0.69 | 14 min |
| Pilot Flying J<br><span class="cost-table__location">Waddy, KY</span> | 24% → 82% | 49.4 kWh | $36.16 | $0.69 | 18 min |
| Electrify America<br><span class="cost-table__location">Indianapolis, IN</span> | 19% → 65% | 38.2 kWh | $22.92 | $0.60 | 13 min |
| Ionna<br><span class="cost-table__location">Lafayette, IN</span> | 35% → 100% | 54.1 kWh | $11.58 | $0.20 | 35 min |
| Electrify America<br><span class="cost-table__location">Rosemont, IL</span> | 46% → 75% | 25.8 kWh | $14.39 | $0.56 | 8 min |
| Total | | 390 kWh | $190.70 | | 3 hr 10 min |

</div>

### Some Costs To Compare {#costs-to-compare}

To cover 952 miles in an average gas car, with 25 mpg, you'd be buying 38 gallons of gas. At the
current national average of around $4, that's $152 in gas. So our EV roadtrip cost us a bit more than
driving a gas car the equivalent distance, but **with home charging** (at the ComEd rate of 15 cents per
kWh), our <strong>390 kWh could cost just around $58.50, $94 cheaper than the gas
equivalent, around one third the cost!</strong>

This reflects an important thing about EV ownership: EVs save you money primarily from charging
cheaply (and more slowly) at home, but the high-powered and high-tech fast chargers cost a ton of
money to build and maintain, so they bill you more to charge.

### Caveats / Why It Was So Expensive {#cost-caveats}

A few caveats here:

1. **Except for charging in Rosemont at the start and end of our journey, we almost always needed
  to stop anyway** - whether to use the bathroom or to eat, I never found that we really had to stop
  for the car. By the time we were pulling up to the charging station, I usually had to use the
  bathroom, or me or my brother were hungry.
1. **Because the rental started with 18% charge, we had to make an extra $35 and 27 minute initial
  charging stop** - our first stop in Rosemont was only because we got a low charge car. Normally
  you'd start a trip with 70 - 80% charge.
1. **Our last charging stop was only because it's a rental** - Since Budget requires EVs be returned
  with 70% state of charge, we similarly made a second stop at Rosemont before returning to top up
  the car.

If you own an EV, you want to charge at home or at slower chargers as much as possible to save money.
In Chicago with ComEd it's estimated you'll pay around 15 cents per kWh. Since at the two Pilot
Flying J locations we were paying $0.69/kWh (plus tax) that means **charging at home costs
_less than a quarter_ of what it cost at our most expensive charger**.

A lot of folks also use [ComEd's hourly pricing program](https://hourlypricing.comed.com/) which
makes it cheaper to charge overnight, when demand is lower, which can bring the cost to charge
your EV as low as 8 cents per kWh, meaning we'd only pay **$6.24 to fully charge the Ioniq 5 I was
driving if I were charging at home!**

In short, **the financial benefits of driving electric comes primarily from home charging** - you
shouldn't expect to see big savings when you're on a road trip, but prioritizing cheaper fast
chargers, hotels with cheaper Level 2 chargers, or getting a membership to the charging network you
use most often can make it a lot cheaper. For example, Electrify America has a Pass+ subscription
where you pay $84 a year to get a 25% discount on charging. Since I spent $102.68 just at Electrify
America stations, I could have saved $25 just on this trip, and if I had that membership I'd
probably try to make each stop at an Electrify America station (except the heavily discounted
Ionna station).

## What It Actually Felt Like {#what-it-felt-like}

I'm a big numbers guy, so I think having all the data on what a road trip really looks like is
helpful, and I hope it helps you understand what it was like! But it's also important
to emphasize the subjective experience here too - **we were very rarely stopping just for the
car** (except our initial and final charges of each day) and **were rarely waiting on the car**.
Some people are good at driving for six hours without a break, but that's not really my cup of tea.
After two hours, especially in the summer heat, I usually need to use the bathroom and appreciate a
break to stretch my legs. And since the car charged so quickly, using the bathroom and grabbing a
snack was plenty of the time for the car to charge.

Or put more concisely: **road tripping in a good EV isn't any more inconvenient for most people
than a typical gas car**.

## Tips For Renting An EV {#renting-tips}

- **Find A Charger Near The Rental Location** - most rental companies require a car to be returned
at a certain state of charge (typically over 70% or 80%), and that can be a little hard to game out
if you're coming from further away. Finding a charger near the rental location makes that easier, and
can help you charge up the car if they give you one with a low charge and don't have any other ones
available.

- **Don't Expect A Home Charger** - I've done a bunch of EV rentals now and it was a real toss up
whether the car came with a charger that you could plug in. If you're renting an EV and want to
charge it at your house, make sure you check the car you get has one!

- **Check What Charging Port The Car Has** - if you get a Tesla, you know for sure it has the NACS
port that Tesla invented, but other cars, including the Ioniq 5, used to have the CCS port and thus
require an adapter to charge at Tesla superchargers. Just pop open the charge door when you get your
rental car and check what charging standard it uses!

## Getting Into An EV {#getting-into-an-ev}

Are you or someone you know ready to get into an electric vehicle? Here's a few tips!

### Know How You Use Your Car {#know-your-usage}

If you're in a two-car household, maybe you want an EV to replace a commuter car - so you can settle
for something older with lower range and slower charging speeds, to save money. But if you like road
tripping, make sure you pay attention to the range as well as the charging speed and _charging time_
(often cited as the time to charge from 10% - 80%) of the EVs you're interested in.

As an example, our Ioniq 5 charged from 10 - 80% in 18 minutes, while an older Chevy Bolt takes 53
minutes, and their newly redesigned 2026 model takes only 25 minutes!

### Look At The Used Market! {#used-market}

A lot of people talk about EVs being more expensive than gas cars, but <strong>this is only true
for new EVs!</strong> Because they are still changing a lot, are more tech-forward, and people have
hesitations around battery longevity, a lot of EVs depreciate faster than their gas counterparts
right now. But most EVs are warrantied for 100,000 miles on their battery, and last much much longer
than that. A friend of mine bought a 100,000-mile used Tesla Model 3 several years ago, and has had
absolutely no issues with it.

As an example, here's some listings for used Hyundai Ioniq 5 EVs, with many under $23,000 with only
24,000 miles on them! And if you just want more of a city car, the deals get even better with used
Chevy Bolts, with older models under $14,000! These charge more slowly, but still have a pretty good 250-mile
range.

<div class="image-grid -two-col">
  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/ioniq5-used-prices.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/ioniq5-used-prices.webp" loading="lazy"
        alt="Edmunds search results for used Hyundai IONIQ 5s near Chicago, Illinois, showing 98
          listings. Four are visible: a 2024 SE with 24,703 miles for $22,410, a 2024 SEL with
          17,000 miles for $22,988, a 2024 SEL with 9,953 miles for $25,407, and a 2025 SEL with
          5,442 miles for $33,990. A banner advertises $5,100 in IONIQ 5 rebates.">
  </a>

  <a class="image-link -in-grid" href="/post-assets/ev-roadtrip/bolt-used-prices.webp"
      target="_blank" rel="noopener">
    <img src="/post-assets/ev-roadtrip/bolt-used-prices.webp" loading="lazy"
        alt="Edmunds search results for used Chevrolet Bolt EVs near Chicago, Illinois, showing 69
          listings. Four are visible: a 2020 Bolt EV LT with 59,478 miles for $13,700, a 2018 Bolt
          EV LT with 78,131 miles for $14,790, a 2017 Bolt EV Premier with 93,510 miles for
          $15,590, and a 2017 Bolt EV LT with 68,148 miles for $15,990. A banner advertises $5,000
          in Chevrolet Bolt EV rebates.">
  </a>
</div>

### Don't Think You Need A Level 2 Charger At Home {#level-2-at-home}

Charging an EV on a standard household outlet is called Level 1 charging, while a higher powered
240V outlet can be used for what's called Level 2 charging. But unless you drive a lot _every day_
**you probably don't need a Level 2 charger!** Level 1 chargers give you 3 - 5 miles per hour of
charge, but overnight for say, 10 hours, that means you'll get 30 - 50 miles back.

To learn more, check out this quick video from This Old House, which dives into it more:

<iframe width="560" height="315" src="https://www.youtube.com/embed/_YcnMRSqdtE?si=HSIu_-fSkUei22Nl"
  title="YouTube Video Player - Electric Vehicle Chargers Explained, This Old House"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin" loading="lazy" allowfullscreen></iframe>

And if you can't charge at home, you can still go electric, but you won't save as much money. Since
most EVs have 300 miles of range, if you live in a city, you probably will only need to charge say,
once a week, depending on how much you drive.

**If you do drive daily to work, see if your workplace has or can install a Level 2 EV charger** - many
parking garages in downtown Chicago have them, for example, letting you charge your car relatively
affordably during the work day!

### Check for Rebates {#rebates}

A lot of states have rebates for EVs or EV chargers. In Illinois, [ComEd has a rebate for EV
chargers](https://www.comed.com/about-us/clean-energy/electric-vehicle-charger-and-installation-rebate)
that can give $750 or $2,500 towards a charger and installation, depending on your income and
community.

### Talk to An Existing EV Owner {#talk-to-an-owner}

If you have questions or concerns about going electric, the best way to learn more is to talk to a
neighbor, friend, or family member who already has an electric car. They can tell you about their
specific vehicle, how they manage charging, and take you for a drive!

## Wrapping Up {#wrapping-up}

I hope this deep dive into my road trip was helpful, and shows you just how doable road tripping in
an EV can be! I've been driving electric for years now, and it's gotten easier every year, as cars
charge faster and chargers become more commonplace.

And if you found the article helpful, share it with a friend!

## Appendix {#appendix}

### Terminology {#terminology}

- **kilowatt** (kW) - a unit of power, roughly equal to the instantaneous power draw of a microwave. EV
charging speeds are in kilowatts, with many modern EVs able to hit over 100 kW on compatible
chargers.

- **kilowatt hour** (kWh) - a unit of energy. As a rough heuristic, about the energy it takes to run a
microwave for an hour. One kWh can usually take you a few miles in an EV. EV batteries often range
from 40 kWh in smaller cars to up to even 205 kWh in large pickup trucks, and even bigger in larger
vehicles.

- **Level 1/2/3 Charging** - categories for EV charging speeds. Level 1 is the slowest charging speed,
from a common household outlet, while Level 3 is the fastest, found just at dedicated fast-charging
sites, and Level 2 is a middle-ground that requires running a dedicated 240-Volt circuit, but is
fairly common.
[Learn more from Car and Driver](https://www.caranddriver.com/features/a70141873/ev-charging-levels-explained/).

- **800 volt architecture** - the voltage an EV's battery system runs at. Most EVs use around 400
volts, but a few (like the Hyundai/Kia EVs, including the Ioniq 5, Ioniq 9, EV6, and EV9) use 800
volts. Higher voltage systems let the car pull more power without more heat, which is why these
cars can faster than typical 400 Volt cars.

- **CCS** (Combined Charging System) - the fast-charging plug most non-Tesla EVs in the US used
until around 2025 & 2026, when other cars started supporting NACS (the Tesla plug). CCS cars need
an adapter to use Tesla Superchargers & home chargers.
[Learn More About NACS vs CCS](https://evseekers.com/ccs-vs-nacs-what-is-the-difference/).

- **NACS** (North American Charging Standard) - the plug type Tesla invented, now being adopted
across the industry as the US standard. These are smaller, making cables easier to manage.
As of late 2026, more and more non-Tesla EVs in North America ship with an NACS port, which also
often means they can use Tesla Superchargers without an adapter, though Tesla has to add support for
automakers individually.
[Learn More About NACS vs CCS](https://evseekers.com/ccs-vs-nacs-what-is-the-difference/).
