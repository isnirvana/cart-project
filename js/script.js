import cart, { updateProductInCart, calcOrderTotal } from "../js/cart.js"
import {} from "../js/confirmation.js"

const URL = "../data.json"
const productList = document.querySelector(".products-list-container")
const empty = document.querySelector(".empty")
const show = document.querySelectorAll(".show")
const cartQuantity = document.querySelector(".cart-quantity")
export const cartProducts = document.querySelector("#selected-items")

let cartUpdated = false

productList.addEventListener("click", addToCart)

function addToCart(event) {
  if (!event.target.classList.contains("add-to-cart-btn")) return
  const targetEvent = event.target.closest(".product-container")
  const productName = targetEvent.querySelector(".product-name")
  const productPrice = targetEvent.querySelector(".product-price")
  let id = Date.now()
  id++

  calcOrderTotal(productPrice)

  const quantity = cartQuantity.querySelector("span")
  const num = parseFloat(quantity.textContent)

  if (num >= 50) {
    alert("Your cart is full")
    return
  }

  quantity.textContent = num + 1

  const productExists = isProductInCart(productName)
  if (productExists) {
    updateProductInCart(productName, productPrice)
  }

  if (productExists && cartUpdated) return

  empty.style.display = "none"
  show.forEach((element) => {
    element.classList.remove("show")
  })

  cartUpdated = true

  const selectedItem = document.createElement("div")
  selectedItem.classList = "selected-product-container"
  selectedItem.dataset.name = `${id}`

  const totalProduct = parseFloat(productPrice.textContent)

  selectedItem.innerHTML = `
  <div class="selected-product-name">${productName.textContent}</div>
  <div class="selected-product-info">
    <div class="order-quantity">1</div>
    <div class="div1">x</div>
    <div class="order-price">@ $${productPrice.textContent}</div>
    <div class="div2">$</div>
    <div class="total-product">${totalProduct.toFixed(2)}</div>
    <button class="delete">
    <img class="delete-img" src="/assets/images/icon-remove-item.svg" alt="#" />
    </button>
  </div>
    `

  cart.push({ productName: productName.textContent, id: id })
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
