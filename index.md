---
layout: default
---

<section class="hero container">
  <h1>{{ site.title }}</h1>
  <p class="site-description">{{ site.description }}</p>
</section>

<section class="posts container">
  <h2>Latest posts</h2>
  <ul class="posts-list">
    {% for post in site.posts %}
      <li class="post-item">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p class="excerpt">{{ post.excerpt | strip_html | truncate: 200 }}</p>
        <small>{{ post.date | date: "%B %d, %Y" }}</small>
      </li>
    {% endfor %}
  </ul>
</section>
