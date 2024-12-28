import cart, { updateProductInCart } from "../js/cart.js"

const URL = "../data.json"
const productList = document.querySelector(".products-list-container")
const cartProducts = document.querySelector("#selected-items")
const empty = document.querySelector(".empty")
const show = document.querySelectorAll(".show")
const cartQuantity = document.querySelector(".cart-quantity")
console.log(parseFloat(cartQuantity.querySelector("span").textContent))

let isTrue = false

productList.addEventListener("click", addToCart)

function addToCart(event) {
  

  if (!event.target.classList.contains("add-to-cart-btn")) return
  const targetEvent = event.target.closest(".product-container")
  const productName = targetEvent.querySelector(".product-name")
  const productPrice = targetEvent.querySelector(".product-price")
  let id = Date.now()
  id++

  const quantity = cartQuantity.querySelector("span")
  const num = parseFloat(quantity.textContent)
  quantity.textContent = num + 1

  const inIt = isProductInCart(productName)
  if (inIt) {
    updateProductInCart(productName)
    // console.log(inIt.id)
    // console.log(inIt)
  }

  if (inIt && isTrue) return

  empty.style.display = "none"
  show.forEach((element) => {
    element.classList.remove("show")
  })

  isTrue = true

  const selectedItem = document.createElement("div")
  selectedItem.classList = "selected-product-container"
  selectedItem.dataset.name = `${id}`

  selectedItem.innerHTML = `
  <div class="selected-product-name">
              <strong>${productName.textContent}</strong>
            </div>
            <div class="selected-product-info">
            <div class="order-quantity">1x</div>
              <div class="${productPrice.textContent}">@ $5.50</div>
              <div class="order-total">$5.50</div>
              <button class="delete">
              <img src="/assets/images/icon-remove-item.svg" alt="#" />
              </button>
              </div>
              `

  cart.push({ productName: productName.textContent, id: id })
  console.log(cart)
  console.log(selectedItem.dataset.name)

  const hr = document.createElement("hr")
  cartProducts.appendChild(selectedItem)
  cartProducts.appendChild(hr)
}

export function isProductInCart(productName) {
  return cart.find((item) => {
    return item.productName === productName.textContent
  })
}

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
