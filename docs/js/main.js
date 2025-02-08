// ===home-slide===
var swiper = new Swiper(".home__pages", {
  loop: true,
  effect: "fade",

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

// =====tabs(products)=====
let tabs = document.querySelectorAll('[data-target');
let tabContents = document.querySelectorAll('[content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    let target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active__tab');
    });

    target.classList.add("active__tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active__tab");
    });

    tab.classList.add("active__tab")

  })
})


// ===header==
let navTop = document.querySelector('.header__top')
let navBottom = document.querySelector('.header__bottom')
let search = document.querySelector('.search-bar')
let btntop = document.querySelector("#totop")
window.addEventListener('scroll', fixNav)

function fixNav() {
  if (window.scrollY > 30) {
    navTop.classList.add('active')
    navBottom.style.dissplay = "none"
    search.classList.remove("show")
    btntop.classList.add("active")
    contetnCart.classList.add("test")

  } else {
    navTop.classList.remove('active')
    navBottom.style.dissplay = "block"
    search.classList.add("show")
    btntop.classList.remove("active")
    contetnCart.classList.remove("test")

  }
}

btntop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// =====dropdown-header===
let arrow = document.querySelector("#arrow");
let coontetn = document.querySelector("#category-drop");
let overdrop = document.querySelector("[data-overdrop]");
let opencategory = document.querySelector(".dropdown");

arrow.addEventListener("mouseover", () => {
  arrow.classList.toggle("active")
  overdrop.classList.toggle("active")
  coontetn.classList.toggle("active");
})
overdrop.addEventListener("mouseover", () => {
  coontetn.classList.remove("active")
  overdrop.classList.remove("active")
})


// ======head===

let headeropen = document.querySelector("#open");
let headerclose = document.querySelector(".clos-filter");
let overl = document.querySelector("[data-overlay]");
let navcontetn = document.querySelector("#header-show");


headeropen.addEventListener("click", () => {
  overl.classList.add("active")
  navcontetn.classList.toggle("active")
})
headerclose.addEventListener("click", () => {
  overl.classList.remove("active")
  navcontetn.classList.remove("active")
})
overl.addEventListener("click", () => {
  navcontetn.classList.remove("active")
  overl.classList.remove("active")
})

// =====cart-open===
let cartopen = document.querySelector(".open-cart");
let contetnCart = document.querySelector("#contetn-cart");
let overcart = document.querySelector("[data-overcart]");
let cartBtn = document.querySelector("#cart-btn")


cartopen.addEventListener("mouseover", () => {
  contetnCart.classList.add("active")
  overcart.classList.add("active");
})
overcart.addEventListener("mouseover", () => {
  contetnCart.classList.remove("active")
  overcart.classList.remove("active");
})
cartBtn.addEventListener("mouseover", () => {
  contetnCart.classList.add("active")
  overcart.classList.add("active");
})

// ======modal==
let closModal = document.querySelector("#close-modal");
let modalCon = document.querySelector("#modal");
let overmodal = document.querySelector("[data-overmodal]");

closModal.addEventListener("click", () => {
  modalCon.classList.add("close")
})

//  ===json===
const productslist = document.querySelector('#all_products');
const products_cart = document.querySelector(".products-cart");
const count = document.querySelector("#count");
const price_js = document.querySelector(".total");
let cartItemId = 1;


eventlisteners();
function eventlisteners() {
  window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    loadcart();
  })

  productslist.addEventListener("click", purchaseProduct)
  products_cart.addEventListener("click", deleteProduct);
}

function updateCartInfo() {
  let cartInfo = fiindCartInfo();
  count.textContent = cartInfo.productCount;
  console.log(cartInfo);
  price_js.textContent = cartInfo.total;

}
updateCartInfo();
function loadJSON() {
  fetch('pruducts.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        productslist.innerHTML += `
        <div class="product__item">
                <div class="product__banner">
                  <a href="details.html?id= ${product.id}" class="product__images">
                    <img src="${product.image_principale}" id="imgtik" class="product__img default " alt="">
                  
                    <img src="${product.image_second}" class="product__img hover" alt="">
                  </a>

                  <div class="product__actions">
                  <a href="#" class="action__btn heart-active" >
                    <i class="fa-regular fa-heart"></i>
                  </a>
                  <a href="details.html?id= ${product.id}" class="action__btn" >
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <button href="#" class="action__btn add-to-cart-btn">
                    <i class="ri-shopping-cart-fill"></i>
                  </button>
                  
                </div>


                  <div class="product__badge light-orange">${product.promo}</div>
                </div>

      
                <div class="product__content">
                    <div class="product__rating">
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <span class="rev-cmpt">${product.rev}</span>
              </div>
                  <span class="product__category">${product.category}</span>
                  <a href="details.html?id= ${product.id}">
                    <h3 class="product__title">${product.name}</h3>
                  </a>
                 

                  <div class="product__price flex">
                    <span class="new__price">${product.new_price}</span>
                    <span class="old">${product.old_price}</span>
                  </div>

                </div>
        </div>
      `
      })
    })
};

function purchaseProduct(e) {
  if (e.target.parentElement.classList.contains('add-to-cart-btn')) {
    let product = e.target.parentElement.parentElement.parentElement.parentElement;
    console.log(product)
    getProductInfo(product);
  }
}

function getProductInfo(product) {
  let productInfo = {
    id: cartItemId,
    imgSrc: product.querySelector('.product__images > img').src,
    name: product.querySelector(".product__title").textContent,
    category: product.querySelector('.product__category').textContent,
    price: product.querySelector('.new__price').textContent
  }
  cartItemId++;
  addToCartList(productInfo);
  saveProductInStorage(productInfo)
}

function addToCartList(product) {
  const cartItem = document.createElement('div');
  cartItem.classList.add("cart-item");
  cartItem.setAttribute('data-id', `${product.id}`)
  cartItem.innerHTML = `
      <div class="img-cart">
          <img src="${product.imgSrc}" alt="">
      </div>
      <p class="title-cart">
        ${product.name}
        <span class="qnty price_js" id="price__cartt">${product.price}</span>
      </p>
      <button class="delete">
        <i class="ri-close-circle-fill"></i>
      </button>
   `

  products_cart.appendChild(cartItem);
}

function saveProductInStorage(item) {
  let products = getProductFromStorage();
  products.push(item)
  localStorage.setItem('products', JSON.stringify(products));
  updateCartInfo();
}

function getProductFromStorage() {
  return localStorage.getItem('products') ? JSON.parse
    (localStorage.getItem('products')) : [];

}

function loadcart() {
  let products = getProductFromStorage();
  if (products.length < 1) {
    cartItemId = 1;
  }
  else {
    cartItemId = products[products.length - 1].id;
    cartItemId++;
  }
  products.forEach(product => addToCartList(product));
  updateCartInfo();
}


function fiindCartInfo() {
  let products = getProductFromStorage();
  console.log(products);
  let total = products.reduce((acc, product) => {
    let price = parseFloat(product.price) ;
    return acc += price;
  }, 0);
  return {
    total: total +" Dhs",
    productCount: products.length
  }
}
fiindCartInfo();


function deleteProduct(e) {
  let cartItem;
  if (e.target.tagName === "BUTTON") {
    cartItem = e.target.parentElement;
    cartItem.remove();
  } else if (e.target.tagName === "I") {
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove();
  }

  let products = getProductFromStorage();
  let updateProducts = products.filter(product => {
    return product.id !== parseInt(cartItem.dataset.id);
  });
  localStorage.setItem("products", JSON.stringify
    (updateProducts));
  updateCartInfo();
}

























// ========Animation By scrolll=======





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
ScrollReveal().reveal('.showcase-wrapper', { delay: 200,origin:"left" });
ScrollReveal().reveal('.trending__products', { delay: 200,origin:"right" });
ScrollReveal().reveal('.footer__bottom', { delay: 200,origin:"left" });
ScrollReveal().reveal('.categories', { delay: 200,origin:"bottom" });
// ScrollReveal().reveal('.remise-part', { delay: 200,origin:"bottom" });
ScrollReveal().reveal('.b1', { delay: 200,origin:"bottom" });
ScrollReveal().reveal('.bg2', { delay: 300,origin:"bottom" });
ScrollReveal().reveal('.bg3', { delay: 350,origin:"bottom" });
ScrollReveal().reveal('.categories__items', { delay: 250,origin:"center" });