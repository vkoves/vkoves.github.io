---
layout: default
title: WIP Posts
---

# Work In Progress Posts

Posts that are currently in progress and unlisted:

<ul>
  {% for post in site.posts %}
    {% unless post.categories contains "WIP" %}
      {% continue %}
    {% endunless %}

    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
