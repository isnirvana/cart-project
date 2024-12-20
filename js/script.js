const URL = "../data.json"
const productList = document.querySelector(".products-list-container")

async function fetchData() {
  const response = await fetch(URL)
  const data = await response.json()
  data.forEach((item) => {
    let products = document.createElement("div")
    createElement(item, products)
    productList.appendChild(products)
  })
}

function createElement(item, products) {
  products.classList = "product-container"

  products.innerHTML = `
<div class="product-image-container">
          <img
            src="${item.image.desktop}"
            alt="product-image"
          />
        </div>
        <div class="product-info">
          <div class="product-category">${item.category}</div>
          <div class="product-name">${item.name}</div>
          <div class="product-price">${item.price.toFixed(2)}</div>
        </div>
        <button class="add-to-cart-btn">
          <img
            class="add-to-cart-icon"
            src="/assets/images/icon-add-to-cart.svg"
            alt="add-to-cart-icon"
          />

          Add to Cart
          <img src="/assets/images/icon-increment-quantity.svg" alt="#" />
        </button>
`
}

fetchData()
