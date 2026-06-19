// Client-side search using Fuse.js
let postsIndex = [];
let fuse;

async function loadIndex(){
  try{
    const res = await fetch('{{ "" }}' + '/search.json');
    postsIndex = await res.json();
    fuse = new Fuse(postsIndex, { keys: ["title", "content", "excerpt"], threshold: 0.35 });
  }catch(e){
    console.warn('Search index not available', e);
  }
}

function doSearch(e){
  if(e) e.preventDefault();
  const q = document.getElementById('search-input').value.trim();
  if(!q) return false;
  if(!fuse){
    alert('Search is not yet ready. Try again in a moment.');
    return false;
  }
  const results = fuse.search(q).slice(0,20).map(r=>r.item);
  // Render simple results page
  const win = window.open('', '_blank');
  const html = [`<html><head><title>Search: ${q}</title><link rel="stylesheet" href="/assets/css/styles.css"></head><body><div class="container"><h1>Search: ${q}</h1>`];
  if(results.length===0) html.push('<p>No results found.</p>');
  else{
    html.push('<ul>');
    results.forEach(r=>{
      html.push(`<li><a href="${r.url}">${r.title}</a><p>${r.excerpt}</p></li>`);
    });
    html.push('</ul>');
  }
  html.push('</div></body></html>');
  win.document.write(html.join('\n'));
  win.document.close();
  return false;
}

loadIndex();
