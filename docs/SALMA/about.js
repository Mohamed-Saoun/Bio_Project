// ===home-slide===
var swiper = new Swiper(".fourn-part", {
    loop:true,
    effect:"fade",
  
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
  });






  



window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});









// =============scrolll reveal========

ScrollReveal({
  reset:true,
  distance:'60px',
  duration:2000,
  delay:500
});
ScrollReveal().reveal('#para_about', { delay: 250,origin:"left" });
ScrollReveal().reveal('.footer__content', { delay: 300,origin:"right" });
  