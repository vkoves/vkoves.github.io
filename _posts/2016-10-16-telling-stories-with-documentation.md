---
layout: post
categories:
 - Archive
---

I've found through working with other programmers that I write documentation in
a pretty unconventional way. In my documentation, I try to convey a sense of
progression and even sometimes a bit of a story in my documentation. So how does
that look, and is it practical?

## Traditional Documentation

From what I've seen, most good documentation basically takes the form of summary
statements at the start of functions, giving a description of what the function
does overall. Classic JSDoc comments are a commonplace example of this. Here's
an example of that style of comment:

{% highlight javascript linenos %}

/**
 * Generates a random number between the inclusive boundaries of a start and end to the range,
 * with the option for rounding.
 * @param {Number} start - The lower boundary of the random range (inclusive)
 * @param {Number} end - The upper boundary of the random range (inclusive)
 * @param {boolean} [round] - Whether the random value should be rounded to an integer
 * @return {Number} The random number generated within the range
 */
function randomRange(start, end, round)
{
  var range = end - start;
  var rand = Math.random();
  rand *= range;
  rand += start;

  if(round)
    rand = Math.round(rand);

  return rand;
}

{% endhighlight %}

Although you understand the input and output of the function pretty well
from this documentation, it isn't that simple to follow along with what
is going on inside of the function. That makes this type of documentation
useful if you're working with the function in question, or if the function
is part of a public API, but not that useful if you're trying to modify
the function.

Although comments can be placed inside of the function, they are usually
only placed once in a while in parts of the function deemed either very
important or very complex, and that is per the developer's judgement,
though certain style guides require comments for variable declarations and
in other specific places

## Unconventional Inline Focused Documentation

My approach is to focus on adding comments inline, inside of the function,
which explains the logical flow of the function. Here's an example:

{% highlight javascript linenos %}

// gets a random number with a given inclusive range specified by the numbers start and end
// can apply rounding if the round parameter is passed as true
function randomRange(start, end, round)
{
  var range = end - start; // determine the range for the random by getting the interval size
  var rand = Math.random(); // get a basic 0-1 random float to start
  rand *= range; // then multiply by the range to get the correct interval size
  rand += start; // and add the start value for the proper offset

  if(round) // if rounding is desired
    rand = Math.round(rand); // apply rounding to the random number

  return rand; // and return
}

{% endhighlight %}

This type of documentation puts an emphasis on inline comments that
explain what is being done both logically and functionally. These
comments answer the questions of **why** something is done, as well
as **what** something is doing. For instance, this second documentation
example explains what the `Math.random()` function does, which, although
not at all necessary for even the most amateur of Javascript developers,
is useful to have.

Likewise, the second example provides the logical reasoning for why the
starting random number is first multiplied by the range, and then has the
starting value added to it. In the first example, it requires extra thought
from a developer looking at the code to figure out why `rand *= range` is
used.

## Addressing Potential Misuse

I've worked on some projects where I was documenting line by line what
was being done in functions, but failed to provide useful block comments
at the start of functions. My teammates faced some difficulty decoding my
work, and one in particular mentioned that they had to read through the
entire function simply to understand what the function did.

Here's an example of a game engine based function in which this might be a problem:

{% highlight javascript linenos %}
var jumpCount = 0; //the number of times the player has jumped

function jump()
{
  if(player.health > 0) // if the player is still alive
  {
    if(player.y - player.height/2 <= 0.05) // and the player is touching the ground
    {
      jumpCount = 1; // reset the jumpCount to 1, indicating they can still double jump
      player.velocity.y = 5; // and set the vertical velocity
    }
    else if(jumpCount < 2) // but if the player is not touching the ground, but has not jumped twice
    {
      jumpCount++; // increment the jump count
      player.velocity.y = 5; // and set the vertical velocity
    }
  }
}
{% endhighlight %}

Although this function is documented very thoroughly (there's a comment on every
line that isn't a bracket), the comments are not necessarily always useful. While
using only block comments assumes that the people working with your functions will
be simply implementing them without modifying them or trying to understand how they
work, documenting only logic inline assumes that everyone who looks at your function
is trying to modify it, rather than trying to use it or implement it.

For instance, without reading through the function, nothing makes clear that this
jump function allows the player to double jump, something that is made clear only
in the innards of the function.

To remedy this, I strictly require that all functions must have block comments of
some form (preferably using a standard format like JSDoc for API type use), which
helps remedy this issue. This gives a reader the choice of reading an overview of
the function (which gives general purpose, input, and output) or, if they want to
work on the function, they can read the inline comments to understand how the
function works.

Here's the same function with a block comment added:

{% highlight javascript linenos %}
var jumpCount = 0; //the number of times the player has jumped

/**
 * Makes the player jump if they are touching the ground, or if they
 * are in the air but have only jumped once, allowing for double jumps.
 * As a safety measure, checks that player health is greater than zero
 * to prevent jumping from working post-mortem.
 */
function jump()
{
  if(player.health > 0) // if the player is still alive
  {
    if(player.y - player.height/2 <= 0.05) // and the player is touching the ground
    {
      jumpCount = 1; // reset the jumpCount to 1, indicating they can still double jump
      player.velocity.y = 5; // and set the vertical velocity
    }
    else if(jumpCount < 2) // but if the player is not touching the ground, but has not jumped twice
    {
      jumpCount++; // increment the jump count
      player.velocity.y = 5; // and set the vertical velocity
    }
  }
}
{% endhighlight %}

This combination of a block comment explaining the overall function purpose
with inline comments creates a readable function for all use cases, whether
someone is working with the function, or working on the function, they can
get the information they need with relative ease. This form of documentation
is what I end up using in most of my projects for this reason.

Have other ways you document your code that you think might be better? Let me know!