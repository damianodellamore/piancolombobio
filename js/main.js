function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

/****************************************
  ANIMAZIONI SCROLL (Intersection Observer)
****************************************/
const options = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, options);

const observerUp = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, options);

const observerScale = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-scale');
    }
  });
}, options);

// Sezioni da far comparire
const sectionTitles = document.querySelectorAll('section h2');
sectionTitles.forEach((el) => observerUp.observe(el));

const cards = document.querySelectorAll('.card, .product-slide');
cards.forEach((card) => observer.observe(card));

const contactForm = document.querySelector('.contact-form');
if (contactForm) observerUp.observe(contactForm);

/****************************************
  HERO SLIDER CON AUTOPLAY
****************************************/
let heroSlideIndex = 0;
showHeroSlide(heroSlideIndex);

function plusHeroSlide(n) {
  showHeroSlide(heroSlideIndex += n);
}

function showHeroSlide(n) {
  const slides = document.getElementsByClassName("hero-slide");
  if (slides.length === 0) return;

  if (n >= slides.length) heroSlideIndex = 0;
  if (n < 0) heroSlideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[heroSlideIndex].style.display = "block";
}

const heroAutoplayInterval = 4000;
setInterval(() => {
  plusHeroSlide(1);
}, heroAutoplayInterval);

/****************************************
  PRODUCT SLIDER SCROLL
****************************************/
const productSlider = document.querySelector('.product-slider');
const productSlides = document.querySelectorAll('.product-slide');

if (productSlider && productSlides.length > 0) {
  let productCurrentScroll = 0;
  const productSlideWidth = 320;
  let productAutoSlideInterval = null;

  function nextProductSlide() {
    productCurrentScroll += productSlideWidth;
    if (productCurrentScroll > (productSlides.length - 1) * productSlideWidth) {
      productCurrentScroll = 0;
    }
    productSlider.scrollTo({ left: productCurrentScroll, behavior: 'smooth' });
  }

  function prevProductSlide() {
    productCurrentScroll -= productSlideWidth;
    if (productCurrentScroll < 0) {
      productCurrentScroll = (productSlides.length - 1) * productSlideWidth;
    }
    productSlider.scrollTo({ left: productCurrentScroll, behavior: 'smooth' });
  }

  function autoScrollProducts() {
    productAutoSlideInterval = setInterval(() => {
      nextProductSlide();
    }, 4000);
  }

  window.addEventListener('load', () => {
    autoScrollProducts();
  });
}
