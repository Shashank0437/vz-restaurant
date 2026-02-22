import './style.css';

// ============================
// DARK / LIGHT MODE TOGGLE
// ============================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('vijay-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('vijay-theme', next);
});

// ============================
// MOBILE HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScrollY = currentScrollY;
});

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-link');

const activateNavLink = () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkElements.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateNavLink);

// ============================
// SCROLL-TRIGGERED ANIMATIONS
// ============================
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -60px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ============================
// MENU CATEGORY TABS
// ============================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.dataset.category;

    let visibleIndex = 0;
    // Show/hide items with animation
    menuItems.forEach((item) => {
      if (item.dataset.category === category) {
        item.classList.remove('animate-on-scroll');
        item.style.display = '';
        item.style.animation = 'none';
        // Force reflow
        item.offsetHeight;
        item.style.animation = `fadeInUp 0.4s ease ${visibleIndex * 0.1}s forwards`;
        visibleIndex++;
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ============================
// SMOOTH IMAGE LOADING
// ============================
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
  if (!img.complete) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
  }
});

// ============================
// HERO VIDEO AUTOPLAY FADE-IN & CROSSFADE
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const v1 = document.getElementById('heroVideo1');
  const v2 = document.getElementById('heroVideo2');
  
  if (v1 && v2) {
    // Slow down the food video playback
    v1.playbackRate = 0.6;

    let activeVideo = v1;
    let nextVideo = v2;
    
    // Wait a few seconds to let the static image be appreciated, then fade in the first video (food)
    setTimeout(() => {
      activeVideo.classList.add('active');
    }, 4000);

    // Crossfade every 10 seconds between the food and hotel videos
    setInterval(() => {
      activeVideo.classList.remove('active');
      nextVideo.classList.add('active');
      
      // Swap pointers
      let temp = activeVideo;
      activeVideo = nextVideo;
      nextVideo = temp;
    }, 10000);
  }
});

