---
layout: post
title: "Creating Accessible Forms: Part 1 - Form Basics"
---

<!--
My plan:

Part 1. Form Basics - <form>, <fieldset>, and submit
Part 2. Form Inputs - labelling & inline feedback
Part 3. Form Feedback
-->

Forms are one of the biggest ways users interact with websites, and as part of creating an accessible website, we need to know how to make accessible forms.

## A Faulty Form

Let's walk through a pretty common example - a signup form. Here's an example of a signup form that I might have seen around the web:

<figure>
  <div>Email*</div>
  <input type="text">

  <div>Password*</div>
  <input type="password">

  <div>Plan*</div>
  <div>
    <input type="radio" name="plan"><span>Free</span>
    <input type="radio" name="plan"><span>Pro</span>
  </div>

  <div>How did you hear about us?</div>
  <input type="text">

  <br><br>

  <div class="red-button">
    Sign Up
  </div>
</figure>

Now before we continue, can you poke around in this form and see what's wrong with it?


<!-- All links for simplicity -->
[mdn-input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
