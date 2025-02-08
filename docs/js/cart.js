let products =JSON.parse(localStorage.getItem('products'));
let products__items = document.querySelector(".products__items");

let data = products;
data.forEach(element => {
    products__items.innerHTML += `
    <hr class="khet">

    <div class="prod__cart">
           <div class="item">
               <img src="${element.imgSrc}" class="details_mini">
               <div class="content">
                   <p>${element.name}</p>
                   <span class="promo-mini">-25%</span>
                   <div class="proce-mini">
                       <span class="new__price-mini">${element.price}</span>
                   </div>
               </div>
           </div>
           <div class="qnt__cart">
               <div class="top__list">
               <span class="qnt">Quantité: x1 </span>
               
               </div>
               <div class="icons">
                   <i class="fa-solid fa-trash"></i>
               </div>
           </div>
   </div>
   <hr>
    `

});
let narti = document.querySelector(".narti");
let totalx = document.querySelector(".totalx");
let totalvv = document.querySelector(".totalvv");
narti.textContent = `Articles (${data.length})`;
const total = data.reduce((acc,value) =>{
    let price = parseFloat(value.price);

    return acc+=price
},0);
totalx.textContent = `${total} Dhs`
totalvv.textContent = `${total} Dhs`












window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });
  