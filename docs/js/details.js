// =====dropdown-header===
let arrow = document.querySelector("#arrow");
let coontetn = document.querySelector("#category-drop");
let overdrop = document.querySelector("[data-overdrop]");
let opencategory = document.querySelector(".dropdown");

 arrow.addEventListener("mouseover", () =>{
  arrow.classList.toggle("active")
  overdrop.classList.toggle("active")
  coontetn.classList.toggle("active");
 })
 overdrop.addEventListener("mouseover",() =>{
  coontetn.classList.remove("active")
  overdrop.classList.remove("active")
})


  // ====imageschange==
  let img = document.querySelector('.details__img');
  let mini = document.querySelectorAll(".details__img__mini");

  function change(changex){
    img.src = changex;
}

// =====tabs(cmt)=====

  detail();
function detail() {
  window.addEventListener('DOMContentLoaded', () => {
    let tabs = document.querySelectorAll('[data-target');
    let tabContents = document.querySelectorAll('[content]');
    
      tabs.forEach((tab) =>{
        tab.addEventListener('click',() =>{
          let target = document.querySelector(tab.dataset.target);
          tabContents.forEach((tabContent)=>{
            tabContent.classList.remove('active__tab');
          });
    
          target.classList.add("active__tab");
    
          tabs.forEach((tab) =>{
            tab.classList.remove("active__tab");
          });
    
          tab.classList.add("active__tab")
    
        })
    
      })
    
  })
}
  
// =====dropdown-header===
let newcoment = document.querySelector(".btn-cmnt");
let contentCmnt = document.querySelector("#cmnt-content");
let closecmnt = document.querySelector("#close-cmnt");
let overlay = document.querySelector("[data-overlay]");

 newcoment.addEventListener("click", () =>{
  arrow.classList.toggle("active")
  overlay.classList.toggle("active")
  contentCmnt.classList.toggle("active");
 })
 overlay.addEventListener("click",() =>{
  contentCmnt.classList.remove("active")
  overlay.classList.remove("active")
})

closecmnt.addEventListener("click",() =>{
    contentCmnt.classList.remove("active")
    overlay.classList.remove("active")
  })




// =====cart-open===
let cartopen = document.querySelector(".open-cart");
let contetnCart = document.querySelector("#contetn-cart");
let overcart = document.querySelector("[data-overcart]");

 
  cartopen.addEventListener("mouseover",() =>{
    contetnCart.classList.add("active")
    overcart.classList.add("active");
  })
  overcart.addEventListener("mouseover",() =>{
    contetnCart.classList.remove("active")
    overcart.classList.remove("active");
  })


  // ============menu=========

  const accordionContent = document.querySelectorAll(".accordion-content");

  accordionContent.forEach((item, index) => {
      let header = item.querySelector("header");
      header.addEventListener("click", () =>{
          item.classList.toggle("open");
  
          let description = item.querySelector(".description");
          if(item.classList.contains("open")){
              description.style.height = `${description.scrollHeight}px`;
              item.querySelector("i").classList.replace("fa-plus", "fa-minus");
          }else{
              description.style.height = "0px";
              item.querySelector("i").classList.replace("fa-minus", "fa-plus");
          }
          removeOpen(index); 
      })
  })
  
  function removeOpen(index1){
      accordionContent.forEach((item2, index2) => {
          if(index1 != index2){
              item2.classList.remove("open");
  
              let des = item2.querySelector(".description");
              des.style.height = "0px";
              item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
          }
      })
  }




  // =====detail json===

  let products = null;
  // get datas from file json
  fetch('pruducts.json')
      .then(response => response.json())
      .then(data => {
          products = data;
          showDetail();
  })

  function showDetail(){
  let details__img = document.querySelector('.details__img');
  let details__title__product = document.querySelector('.details__title__product');
  let price = document.querySelector('#price_det');
  let promo = document.querySelector('#promo_det');
  let productId =  new URLSearchParams(window.location.search).get('id');
  let thisProduct = products.filter(value => value.id == productId)[0];
  if(!thisProduct){
      window.location.href = "/";
  }
  let mini1 = document.querySelector(".mini1");
  let mini2 = document.querySelector(".mini2");
  let mini3 = document.querySelector(".mini3");
  let mini4 = document.querySelector(".mini4");


  details__img.src = thisProduct.image_principale;
  mini1.src = thisProduct.image_principale;
  mini2.src = thisProduct.detail1;
  mini3.src = thisProduct.detail2;
  mini4.src = thisProduct.detail3;
  details__title__product.innerText = thisProduct.name;
  price.innerText =  thisProduct.new_price;
  promo.innerText =  thisProduct.promo;
}


// ========Add to cart========

function purchaseProduct(e) {
  if (e.target.parentElement.classList.contains('add-to-cart-btn')) {
    let product = e.target.parentElement.parentElement.parentElement.parentElement;
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
        <span class="qnty price_js">${product.price}</span>
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
    let price = parseFloat(product.price);
    return acc += price;
  }, 0);
  return {
    total: total.toFixed(2),
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


























// ====zoom image===
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.details__group');
  const image = document.querySelector('.image');
  const magnifier = document.querySelector('.magnifier');

  container.addEventListener('mousemove', function (e) {
      const { left, top, width, height } = container.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;

      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
          magnifier.style.display = 'block';
          const ratioX = width / image.width;
          const ratioY = height / image.height;
          const bgPosX = -mouseX / ratioX + 'px';
          const bgPosY = -mouseY / ratioY + 'px';

          magnifier.style.backgroundImage = `url('${image.src}')`;
          magnifier.style.backgroundSize = `${image.width * ratioX}px ${image.height * ratioY}px`;
          magnifier.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
          magnifier.style.left = e.pageX - magnifier.offsetWidth / 2 + 'px';
          magnifier.style.top = e.pageY - magnifier.offsetHeight / 2 + 'px';
      } else {
          magnifier.style.display = 'none';
      }
  });
});





// =======faq====

const plus = document.querySelectorAll(".plus");
const cross = document.querySelectorAll(".cross");
const hidden = document.querySelectorAll(".hidden");
const para = document.querySelectorAll(".para");

for (let i = 0; i < plus.length; i++) {
  plus[i].addEventListener("click", function () {
    plus[i].classList.toggle("hidden");
    cross[i].classList.toggle("hidden");
    para[i].classList.toggle("hidden");
  });
}

for (let i = 0; i < cross.length; i++) {
  cross[i].addEventListener("click", function () {
    cross[i].classList.toggle("hidden");
    plus[i].classList.toggle("hidden");
    para[i].classList.toggle("hidden");
  });
}














window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});
