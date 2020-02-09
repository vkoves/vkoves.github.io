---
layout: post
isPost: true
---

In 2020, I want to start writing more, so I am fully refreshing my website's
writing with a new focus. This year, I want to help push accessibility forward
everywhere on the web, so expect some posts about tools you can use to audit a
website's accessibility, case studies about some accessible projects I have
done, and how you can make your websites accessible.

Looking for an older post I made before 2020? Here they all are:

<ul>
  {% for post in site.posts %}
    {% unless post.categories contains "Archive" %}
      {% continue %}
    {% endunless %}

    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
