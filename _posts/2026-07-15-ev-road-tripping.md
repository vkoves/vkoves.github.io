---
layout: post
title: "Chicago to Mammoth Caves: A Case Study in Seamless EV Road Tripping"
metadata:
  image:
  description:
    If you haven't driven electric before, a road trip might sound impossible - but I want to tell
    you about driving from Chicago to Kentucky to Mammoth Caves.
stylesheets:
 - articles/ev-road-trip.css
scripts:
 - articles/ev-road-trip.js
---

When people talk about going electric, they are often concerned about road tripping - an EV might be
fine for my daily commute, but can I still make a long road trip for a summer vacation? I'm here
to tell you that modern EVs can tackle a road trip incredibly well.

## What I'll Cover

Ionna Lafayette Indiana

## The Vehicle - The Hyundai Ioniq 5!

For this road trip, I was driving a 2023 Hyundai Ioniq 5 SEL AWD, with a 77.4 kWh battery.

<img src="/post-assets/ev-roadtrip/ioniq5-main.webp" loading="lazy"
    alt="A matte grey 2023 Hyundai Ioniq 5 at an Ionna charging station on a sunny day">


The Ioniq 5 is a very capable but budget-friendly EV - here's some quick facts:

- Starts at around $37,000 ($45,000 for the long-range version)
- Charges 10% to 80% in about 20 minutes
- EPA rated range of up to 318 miles

Since I was driving a 2023 all wheel drive model, it has an 266 mile EPA range rating - the newer
model years have a larger battery for the long-range model, and rear wheel drive models have the
318 mile range!

## The Trip

Let's get started! I've made a little progress bar to follow along on our journey.

<!-- Vue 3 CDN: loaded synchronously so it's available when the deferred component script runs -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<div id="trip-progress" style="position: sticky; top: 4rem; z-index: 100;"></div>


## Day 1: Departing Chicago {#chicago-start}

We started our adventure at the O'Hare airport Budget location, where we picked our delightful matte
grey 2023 Hyundai Ioniq 5 SEL AWD EV.

There was only one problem - due to a mixup at the rental place, they pointed us to a parking spot
where they had chargers, and they had likely moved the car we were _supposed to get_ out and swapped
it with a car that needed a charge.

<img src="/post-assets/ev-roadtrip/ioniq5-at-rental.webp" loading="lazy"
    alt="The Hyundai Ioniq 5 in the rental parking garage, plugged in next to a red Tesla Model Y">

<img src="/post-assets/ev-roadtrip/ioniq5-initial-charge.webp" loading="lazy"
    alt="The Ioniq 5 dashboard showing a low 18% state of charge with 40 miles estimated range">

I'll cover some tips on renting later on, but I was prepared - I've rented EVs a lot from the
O'Hare, and knew that there's an Electrify America fast charging station in Rosemont at
the Fashion Outlets Mall, just a few minutes and a few miles away from O'Hare. So we drove over
there, plugged in the car, got some coffee and used the bathroom, and 27 minutes later were back on
our way!

<img src="/post-assets/ev-roadtrip/day1/rosemont-day1-charging-speed.webp" loading="lazy"
    alt="The Ioniq 5 dashboard display showing a 16% SOC, a 43 kW current charging rate, and
    estimated remaining times of 17 minutes to 80% and 47 minutes to 100%.">

<img src="/post-assets/ev-roadtrip/day1/rosemont-day1-receipt.webp" loading="lazy"
    alt="Display screen on an Electrify America charger showing 27 minutes of charging time,
    $34.49 cost, 61.7283 kWh energy delivered, and a 92% state of charge.">

## Charging Stops {#charging-day1}

Now that we had a full charge in Rosemont (92%), we were ready to drive to Kentucky! From Rosemont,
our hotel in Munfordville Kentucky is a 400 mile drive, and we only need to stop to charge twice!



Now you might be thinking - if the Ioniq 5 we were driving had a 266 mile EPA range, why did we need
to stop twice? That's because an EPA range is a mix of city and highway driving, and so exclusively
driving on a highway, EVs usually have a roughly 30% range penalty. In my experience, this 2023
Ioniq 5 SEL AWD got a 200 mile highway range, so to safely make a 400 mile journey (especially since
you rarely recharge an EV fully to 100%) and have charge when we got the hotel, we needed to stop
twice.

As you'll see though, with a modern EV (especially an 800 volt car like the ioniq 5) charging stops
are really no problem - and we usually needed to eat or use the bathroom anyway! By the time we were
ready to go, the car was ready to go nine times out of ten.

### How Do You Find Charging Stops?

To find charging stops, I used [A Better Route Planner](https://abetterrouteplanner.com), which is
widely regarded as the best app for planning out longer road trips - you put in what car you have,
it's state of charge, and your destination, and it'll plan out what stops you need to make to get
to your destination with your desired state of charge! Here's a screenshot of a plan it drew up
from Rosemont to Mammoth Caves:

<img src="/post-assets/ev-roadtrip/a-better-route-planner.webp" alt="A map on A Better Route Planner
  displaying an EV route from Rosemont, Illinois, to Mammoth Cave National Park. The side panel
  shows a total travel time of 7 hours and 10 minutes over 669 km with two charging stops: a 12
  minute stop at an IONNA station in Lafayette, Indiana, and a 12 minute stop at a ChargePoint
  station in Shepherdsville, Kentucky.">

### Stop 1 - Ionna in Lafayette, Indiana

143 miles from Rosemont at 4:48pm Eastern, we ended up at a brand new Ionna charging station in
Lafayette Indiana with still 22% charge left. This station
[opened in late June](https://www.wlfi.com/2026/06/24/wawa-lafayette-holds-grand-opening), just a
week before we got there on July 1st.

[Ionna](https://en.wikipedia.org/wiki/Ionna) is one of the newest charging providers, started in
February 2024 and [opening their first location in February 2025](https://www.electrive.com/2025/02/05/usa-ionna-officially-opens-first-charging-station/).

Because they had just opened, Ionna actually had a 20 cent/kWh deal, and we only paid $14.05 for
that full charge - talk about a deal! Even if gas was let's say $3 a gallon in Indiana (I didn't
get a photo of gas prices nearby, but in late July after more gas price rises, $3.50 was in the
area), that's ~4.5 gallons of gas, only enough for 112 miles in an car of average gas mileage (25 MPG).

We ended up charging for 42 minutes in Lafayette, but that's not because the car needed to - if we
were really rushing, we'd hit 80% at keep going, since all EVs (and all battery powered devices)
dramatically slow down their rate of charge over 80%. But since we were eating a late lunch at the
attached Wawa, we just ate our meal and came back to a fully charged car!

<img src="/post-assets/ev-roadtrip/day1/ionna-lafayatte-day1-receipt.webp" loading="lazy"
    alt="Display screen of an Ionna EV charging station showing a completed charging session at 99%
      state of charge, 65.6 kWh delivered in 42 minutes, and a total cost of $14.05.">

### Stop 2 - Electrify America in Clarksville, Indiana

At 8:25pm Eastern, 171 miles from our charging stop in Lafayette, we ended up at an Electrify America station in
Clarksville, Indiana with 26% charge left - we stopped in the Walmart, used the restroom, and ate
some food, and the car got 97% charged, in 33 minutes! Similar to before, we weren't waiting on the
car, and from 27% to 80% the car itself estimated it would take only 16 minutes to charge - but we
had to eat!

<img src="/post-assets/ev-roadtrip/day1/electrifyamerica-day1-receipt.webp" loading="lazy"
    alt="Screen of an Electrify America charging station showing a completed charging session at
      97% state of charge and 59.7 kWh delivered over 33 minutes, and a total cost of $30.88">

## Arriving in Kentucky {#kentucky-arrival}

After a 78 mile drive, we then got to our hotel at 9:38pm Eastern time with 68% charge - plenty for
our adventures! You might notice that's a pretty large range drop for that distance, but I was
probably driving a little faster than before since we had plenty of charge to get back to the hotel.

**Pro Tip - Speed is a huge factor in EV range!** Gasoline is incredibly energy dense, so we often
don't realize just how much leeway it gives us. For context, one gallon of gasoline is equivalent to
33 kWh of energy ([source](https://en.wikipedia.org/wiki/Gasoline_gallon_equivalent#Gasoline_gallon_equivalent_tables)), which means our ioniq 5, with its

## Mammoth Caves

During the day, we drove 22 miles from our hotel to the cave visitor center and then 22 miles back,
and ended the day at 51% charge.

## Day 3: Leaving Kentucky {#kentucky-day2}

We had to make a detour on our way back home to visit a friend in Lexington, which would add 100
miles to our journey back. Since the car was at half charge and Lexington was 110 miles away, it
would have been possible to make it to Lexington, but we would have had very low charge, so we
looked for the closest charger to our hotel. Turns out even in Kentucky, there was a fast charger
just 17 miles away!

## Return Charging Stops {#charging-day2}

Pilot Flying J Sonora, Kentucky - 43% to 86% for $26.23 in 14 minutes

<img src="/post-assets/ev-roadtrip/day3/pilot-flyingj-1-sonora-day-3-receipt.webp" loading="lazy"
    alt="Digital screen of a Pilot Flying J GM Energy EV charger displaying a finished session
    reaching 86% state of charge, delivering 35.8 kWh in 14 minutes and 36 seconds for a total
    cost of $26.23.">

## Lunch in Lexington (110mi from Sonora)

## Stop 1

Pilot Flying J in Waddy, KY - 24% to 82% for $36.16 in 18 minutes

<img src="/post-assets/ev-roadtrip/day3/pilot-flyingj-2-waddy-day-3-receipt.webp" loading="lazy"
    alt="Digital screen of a Pilot Flying J GM Energy EV charger showing a completed session at
    82% state of charge, delivering 49.4 kWh in 17 minutes and 52 seconds for a total cost of $36.16.">

## Stop 2

Electrify America in Indianapolis, IN - 19% to 65% for $22.92 in 13 minutes.

<img src="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-indianapolis.webp" loading="lazy"
    alt="TODO">

<img src="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-final-charge.webp" loading="lazy"
    alt="TODO">

<img src="/post-assets/ev-roadtrip/day3/electrifyamerica-day3-indianapolis-receipt.webp" loading="lazy"
    alt="TODO">

## Stop 3

Back at Ionna Lafayette, IN - 35% to 100% for $11.58 in 35 minutes, thanks to sale and we were eating

<img src="/post-assets/ev-roadtrip/day3/ionna-day3-receipt.webp" loading="lazy"
    alt="Display screen of an Ionna EV charging station showing a finished session at 100% state of
      charge from 35%, 54.1 kWh delivered in 35 minutes, and a final cost of $11.58.">

## Stop 4 - Only Needed Because We're Renting

Rosemont to finish up 46% to 78% for $14.39 8 minutes

<img src="/post-assets/ev-roadtrip/day3/rosemont-day3-receipt.webp" loading="lazy"
    alt="Screen of an Electrify America charging station showing a completed session, reaching 75%
      state of charge and 25.8 kWh delivered in 8 minutes for a total cost of $14.39.">

## Back in Chicago {#chicago-return}


## Our Final Costs & Time

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
| Total | | | $190.70 | | 3 hr 10 min |

</div>

A few caveats here:

1. **Except for charging in Rosemont at the start and end of our journey, we almost always needed
  to stop anyway** - whether to use the bathroom or to eat, I never found that we really had to stop
  for the car. By the time we were pulling up to the charging station, I usually had to use the
  bathroom, or me or my brother were hungry.
1. **Because the rental started with 18% charge, we had to make an extra $35 and 27 minute initial
  charging stop** - our first stop in Rosemont was only because we got a low charge car. Normally
  you'd start a trip with 70 - 80% charge.
2. **Our last charging stop was only because it's a rental** - Since Budget requires EVs be returned
with 70% state of charge, we similarly made a second stop at Rosemont before returning to top up the car.

If you own an EV, you want to charge at home or at slower chargers as much as possible to save money.
In Chicago with ComEd it's estimated you'll pay around 16 cents per kWh. Since at the two Pilot
Flying J locations we were paying $0.69/kWh (plus tax) that means **charging at home costs
_one fourth_ what it cost at our most expensive charger**.

A lot of folks also use [ComEd's hourly pricing program](https://hourlypricing.comed.com/) which
makes it cheaper to charge overnight, when demand is lower, which can bring the cost to charge
your EV as low as 8 cents per kWh, meaning we'd only pay **$6.24 to fully charge the Ioniq 5 I was
driving at home!**

In short, **the financial benefits of driving electric comes primarily from home charging** - you
shouldn't expect to see big savings when you're on a road trip, but prioritizing cheaper fast
chargers, hotels with cheaper Level 2 chargers, or getting a membership to the charging network you
use most often can make it a lot cheaper. For example, Electrify America has a Pass+ subscription
where you pay $84 a year to get a 25% discount on charging. Since I spent $102.68 just at Electrify
America stations, I could have saved $25 just on this trip, and if I had that membership I'd
probably try to make each stop at an Electrify America station (except the heavily discounted
Ionna station).

## Tips For Renting??? (separate article? end notes)

- Find a charger near the rental location for return and if they give you a low battery EV
- Don't expect a home charger - I've had a few

### Used EVs



### Terminology
