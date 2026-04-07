// scripts.js
const recipes = [
  {
    title: "Charred Broccoli with Lemon and Anchovy",
    excerpt: "Deeply roasted broccoli with a bright, salty dressing you’ll want to put on everything.",
    tags: ["broccoli", "weeknight", "vegetarian", "summer"],
    url: "recipes/broccoli.html",
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"
  },
  {
    title: "Tomato Tart with Garlic and Capers",
    excerpt: "Flaky pastry, peak tomatoes, and lots of olive oil.",
    tags: ["summer", "baking"],
    url: "recipes/tomato-tart.html",
    image: "https://images.pexels.com/photos/4109994/pexels-photo-4109994.jpeg"
  },
  {
    title: "Caramelized Beans with Tomato & Cabbage",
    excerpt: "Saucy, tangy, a little sweet from jammy tomatoes and browned cabbage.",
    tags: ["winter", "beans", "comfort"],
    url: "recipes/beans.html",
    image: "https://images.pexels.com/photos/6287521/pexels-photo-6287521.jpeg"
  },
  {
    title: "Midnight Carrot Cake",
    excerpt: "No raisins, no nuts, just dense, custardy carrot cake from the fridge.",
    tags: ["dessert", "baking"],
    url: "recipes/carrot-cake.html",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
];

const gridEl = document.getElementById("recipes-grid");
const searchInput = document.getElementById("search-input");
const tagButtons = Array.from(document.querySelectorAll(".tag-button"));

let activeTag = null;

function renderRecipes(list) {
  gridEl.innerHTML = "";
  if (list.length === 0) {
    gridEl.innerHTML = "<p>No recipes found. Try a different search or tag.</p>";
    return;
  }

  list.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <a class="recipe-link" href="${recipe.url}" target="_blank" rel="noopener noreferrer">
        <div class="recipe-meta">${recipe.tags.join(" · ")}</div>
        <img class="recipe-image" src="${recipe.image}" alt="${recipe.title}">
        <h2 class="recipe-title">${recipe.title}</h2>
        <p class="recipe-excerpt">${recipe.excerpt}</p>
      </a>
    `;

    gridEl.appendChild(card);
  });
}

function getFilteredRecipes() {
  const q = searchInput.value.trim().toLowerCase();
  return recipes.filter((r) => {
    const matchesText =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.excerpt.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q));

    const matchesTag = !activeTag || r.tags.includes(activeTag);

    return matchesText && matchesTag;
  });
}

function update() {
  renderRecipes(getFilteredRecipes());
}

searchInput.addEventListener("input", update);

tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;
    activeTag = activeTag === tag ? null : tag;

    tagButtons.forEach((b) =>
      b.classList.toggle("active", b.dataset.tag === activeTag)
    );

    update();
  });
});

// initial render
renderRecipes(recipes);
