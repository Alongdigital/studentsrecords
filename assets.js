
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
  hero: "https://imgh.in/host/3cnnth",

  // Optional additional images for future pages
  images: {
    students: "https://imgh.in/host/v6cirl",

    classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",

    library: "https://imgh.in/host/ot51fo"
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
