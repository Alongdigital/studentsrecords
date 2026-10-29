
/*
 * PREMIUM STUDENT PORTAL
 * File: assets.js
 *
 * Replace these URLs with your own hosted image URLs.
 * Use direct image URLs ending in .png, .jpg, .webp, etc.
 */

const ASSETS = {
  // Website branding
  logo: "https://imgh.in/host/j5248w",

  // Main hero banner
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85",

  // Optional additional images for future pages
  images: {
    students: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85",

    classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",

    library: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85"
  }
};


/*
 * Apply assets to the existing index.html.
 * This code does not require any HTML changes.
 */

document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("siteLogo");
  const hero = document.getElementById("heroImage");

  if (logo && ASSETS.logo) {
    logo.src = ASSETS.logo;

    logo.addEventListener("error", function () {
      logo.style.display = "none";
    }, { once: true });
  }

  if (hero && ASSETS.hero) {
    hero.src = ASSETS.hero;

    hero.addEventListener("error", function () {
      hero.style.display = "none";
    }, { once: true });
  }
});
