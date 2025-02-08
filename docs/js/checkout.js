let products =JSON.parse(localStorage.getItem('products'));
let items = document.querySelector(".items");

let data = products;
console.log(data)

data.forEach(element=>{
  items.innerHTML += `
  <div class="item">
  <img src="${element.imgSrc}" class="details_mini">
  <div class="content">
    <p class="tti">${element.name}</p>
    <span class="promo-mini">-25%</span>
    <div class="stars">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star-half-stroke"></i>
    </div>
    <div class="proce-mini">
      <span class="new__price-mini">1${element.price}</span>
    </div>
  </div>
  <div class="qnt">
    <span class="qntyy">Qaunité: x1</span>
  </div>
</div>

  `
})
let title = document.querySelector("#oo");
let proce = document.querySelector(".proce");
let total_price = document.querySelector(".total-price");
title.textContent = `Apercus la commande,Articles (${data.length})`;
const total = data.reduce((acc,value) =>{
  let price = parseFloat(value.price);

  return acc+=price
},0);
proce.textContent = `${total} Dhs`
total_price.textContent = `${total} Dhs`











window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});
