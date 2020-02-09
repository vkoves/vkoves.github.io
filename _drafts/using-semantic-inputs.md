---
layout: post
isPost: true
title: Using Semantic Inputs
---

HTML input elements are a huge piece in how users interact with your
website. So what's the right input type for a given job, and what difference
does it make anyway?

## The Basics

We've all used the basic inputs in one form or another. Making a login from?
You're probably going to start with an `<input type="text">` and an
 `<input type="password">`. If we look at these in code and in our UI, it's
 pretty obvious why we use them. But (as [MDN][mdn-input] will helpfully tell
 you) there are a whopping **twenty-two different HTML input types!** That's a
 lot of inputs, and at first it might seem like we don't even need them all.

However, if (like me), you've ever had to implement more sophisticated inputs that
for taking a time, a date, or even just an email, you might be tempted to take
a simple text input, and just keep throwing Javascript at it until it does what
you want.

Learn from my mistakes, and trust me when I say that **making your own
accessible input replacements, is difficult, time-consuming, and often
unnecessary**.


Let's walk through a pretty common example - an email form.



<form id="email-form-1">
  <label for="email-1">Email</label>
  <input id="email-1" name="email" type="email">
  <button type="submit">Send Email</button>
</form>

<form id="email-form-2">
  <label for="email-2">Email</label>
  <input id="email-2" name="email" type="text">
  <button type="submit">Send Email</button>
</form>


<script type="text/javascript">
  function submitForm(event) {
    event.preventDefault();

    console.log({ event });

    alert('Great! You submitted the email ' + value);
  }

  document.getElementById('email-form-1').onsubmit = function(event) {
    submitForm();
  };

  document.getElementById('email-form-2').onsubmit = function(event) {
    submitForm();
  };
</script>



[mdn-input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
