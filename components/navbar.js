// components/my-header.js
class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header" id="site-header">
        <div class="header-inner">
        <nav class="nav-left">
            <a href="index.html" class="logo">The Food That We Share</a>
            <!-- <a href="#">Connect with our favorite farms</a> -->
        </nav>
        <div class="mobile-svg">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11.5" r="8" stroke="#290A08" stroke-width="1.2"></circle>
            <path d="M16.5 17L21.5 22" stroke="#290A08" stroke-width="1.2"></path>
            </svg>
        </div>
        <a></a>
        <nav class="nav-right">
            <a href="about.html">About</a>
            <a href="#">Recipes</a>
            <a href="#">Search</a>
            
            <button class="btn-subscribe">Instagram</button>
        </nav>
        <button class="burger" id="burger" aria-label="Open menu">
            <span></span><span></span><span></span>
        </button>
        </div>
        <!-- Mobile menu -->
        <div class="mobile-menu" id="mobile-menu">
        <a href="#">Recipes</a>
        <a href="#">Our partners</a>
        <a href="#">Instagram</a>
        <a href="#">Shop</a>
        <a href="about.html">About</a>
        <a href="#" class="mobile-subscribe">Subscribe</a>
        </div>
    </header>
  `;
  }
}
customElements.define('my-header', MyHeader);