---
layout: default
---

<section class="hero container">
  <div class="hero-inner">
    <h1 class="site-title">{{ site.title }}</h1>
    <p class="site-description">{{ site.description }}</p>
  </div>
</section>

<section class="posts container">
  <h2 class="section-title">Latest posts</h2>
  <div class="posts-grid">
    {% for post in site.posts limit: 12 %}
      <article class="post-card">
        {% if post.image %}
          <a class="card-thumb" href="{{ post.url | relative_url }}">
            <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
          </a>
        {% endif %}
        <div class="card-body">
          <h3 class="card-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <p class="card-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
          <div class="card-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
            <a class="read-more" href="{{ post.url | relative_url }}">Read →</a>
          </div>
        </div>
      </article>
    {% endfor %}
  </div>

  <div class="more">
    <a href="/archives/">View all posts</a>
  </div>
</section>
