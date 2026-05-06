const BASE = '/the-food-that-we-share'; 

async function loadComponent(id, path) {
  const res = await fetch(`${BASE}/${path}`);
  if (!res.ok) { console.error(`Failed to load ${path}:`, res.status); return; }
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent('header', 'components/header.html');
loadComponent('footer', 'components/footer.html');