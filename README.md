<img src="images/favicon.ico?raw=true" align="right" width="100">

#  Viktor Köves' Home Base [![Build Status](https://travis-ci.org/vkoves/vkoves.github.io.svg?branch=master)](https://travis-ci.org/vkoves/vkoves.github.io)

My personal website, used for everything from showcasing work to prototyping and messing around with HTML. Have suggetions or feedback? Open an issue.

## Running

This project uses [Jekyll]([Jekyll](https://jekyllrb.com/)), so to run it
locally simply do:

```shell
bundle install # install all gems
jekyll serve # host the site locall
```

The site should be hosted for you at `localhost:4000`.

## Testing

This site uses Travis for CI, but you can run the CI locally by running:

```shell
./ci.sh
```

This will build the Jekyll site and then run it through validation with
[HTML Proofer](https://github.com/gjtorikian/html-proofer).

## Features

- Gallery - Powered by jQuery and some nifty CSS3, this animated gallery shows off some visual parts of my work, including a way to view titles and descriptions. The gallery images are dynamically loaded in using Javascript.

- Portfolio - List of projects, each with its own gallery of images, description, and set of tools. This is also dynamically generated using Javascript instead of being stored in the DOM.

- Blog - Jekyll powered blog, used for technical posts with well formatted code snippets.

## Notable Pages

- [Apollo](http://viktorkoves.com/apollo) -
	Spotify API powered tool for learning more about songs. It is now hosted on [its own repository](https://github.com/vkoves/apollo).
- [Christmas In Clouds](https://viktorkoves.com/projects/christmas-in-clouds/) -
	The homepage for a festive game I made for the holidays in the Unity game engine.

## Technology

This website is powered by [Jekyll](https://jekyllrb.com/), and uses custom CSS
and jQuery for just about everything.
