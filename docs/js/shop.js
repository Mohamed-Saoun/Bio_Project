
function reload() {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
}
window.addEventListener("load", () => {
  reload();
});


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



// ===header bar search==
let navTop = document.querySelector('.header__top')
let navBottom = document.querySelector('.header__bottom')
let search = document.querySelector('.search-bar')
window.addEventListener('scroll', fixNav)

function fixNav() {
  if (window.scrollY > 30) {
    navTop.classList.add('active')
    navBottom.style.dissplay = "none"
    search.classList.remove("show")
    contetnCart.classList.add("test")
  } else {
    navTop.classList.remove('active')
    navBottom.style.dissplay = "block"
    search.classList.add("show")
    contetnCart.classList.remove("test")


  }
}
// =====filter==

let filterOpen = document.querySelector("#filter-show");
let filterClose = document.querySelector(".clos-filter");
let overlay = document.querySelector("[data-overlay]");
let filterContent = document.querySelector("#filter-content");


filterOpen.addEventListener("click", () => {
  overlay.classList.add("active")
  filterContent.classList.toggle("active-filter")
})
filterClose.addEventListener("click", () => {
  overlay.classList.remove("active")
  filterContent.classList.remove("active-filter")
})
overlay.addEventListener("click", () => {
  filterContent.classList.remove("active-filter")
  overlay.classList.remove("active")
});




// =====cart-open===
eve();

function eve() {
  window.addEventListener('DOMContentLoaded', () => {
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

  })
}


// =json
const productsContainer = document.querySelector("#products_shop");
const products_cart = document.querySelector(".products-cart");
const count = document.querySelector("#count");
const price_js = document.querySelector(".total");
let cartItemId = 1;

eventlisteners();
function eventlisteners() {
  window.addEventListener('DOMContentLoaded', () => {
    loadproductsc();
    loadcart();
  })
  productsContainer.addEventListener("click", purchaseProduct)
  products_cart.addEventListener("click", deleteProduct);
}

function updateCartInfo() {
  let cartInfo = fiindCartInfo();
  count.textContent = cartInfo.productCount;
  price_js.textContent = cartInfo.total;

}
updateCartInfo();
function loadproductsc() {
  fetch("pruducts.json")
    .then(res => res.json())
    .then(data => {
      let data_push = data
      const productsContainer = document.querySelector("#products_shop");
      const categoryList = document.querySelector(".category_mini");

      function displayProducts(products) {
        if (products.length > 0) {
          const product_details = products
            .map(
              (product) => `
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
            )
            .join("");

          productsContainer.innerHTML = product_details;
        } else {
          productsContainer.innerHTML = "<h3>No Products Available</h3>";
        }
      }

      function setCategories() {
        const allCategories = data.map((product) => product.category);
        const catagories = [
          "All",
          ...allCategories.filter((product, index) => {
            return allCategories.indexOf(product) === index;
          }),
        ];
        categoryList.innerHTML = catagories.map((catagory) => `<li class="category__list"><a href="#">${catagory}</a></li>`).join("");

        categoryList.addEventListener("click", (e) => {
          const selectedCatagory = e.target.textContent;
          selectedCatagory === "All" ? displayProducts(data) : displayProducts(data.filter((product) => product.category == selectedCatagory));
        });
      }



      function eventlisteners() {
        window.addEventListener('DOMContentLoaded', () => {
          const txtSearch = document.querySelector("#txtSearch");
          txtSearch.addEventListener("keyup", (e) => {
            const value = e.target.value.toLowerCase().trim();
            if (value) {
              displayProducts(data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
            } else {
              displayProducts(data);
            }
          });
        })
      }
      eventlisteners()
      displayProducts(data_push);
      setCategories();

      // ==========filter By search==========

      const categories = [...new Set(data_push.map((item) => { return item }))]
      console.log(categories)

      document.getElementById('searchBar').addEventListener('keyup', (e) => {
        const searchData = e.target.value.toLowerCase()
        const filteredData = categories.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchData)
          )
        })
        displayProducts(filteredData);
      });
      displayProducts(categories);

      // ========filter By price===
      let goprice = document.querySelector("#goprice");
      goprice.addEventListener('click', function () {
        let maxprice = document.querySelector("#maxprice");
        let minPrice = document.querySelector("#minprice");
        productFilter = data_push.filter(item => {
          if (minPrice.value != '') {
            if (item.new_price < minPrice.value) {
              return false;
            } 
          }
          if (maxprice.value != '') {
            if (item.new_price > maxprice.value) {
              return false;
            }
          }
          return true;
        })
        displayProducts(productFilter);
      })

    })
};

// =======cart=====

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


