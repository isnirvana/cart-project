import cart, { emptyCart } from "../js/cart.js"
import { isProductInCart } from "../js/script.js"

const confirmation = document.querySelector(".confirmation-container")
const overlay = document.querySelector(".overlay")
const confirmOrderDiv = document.querySelector(".confirmation-order")
const cartHTML = document.querySelector(".cart")
let timeoutId = null

export function confirmOrderInCart() {
  if (timeoutId) {
    clearInterval(timeoutId)
    overlay.style.opacity = "1"
    confirmation.style.animationName = "animateFromTop"
    confirmation.style.animationDuration = "1s"
  }
  const products = cartHTML.querySelectorAll(".selected-product-container")
  const total = document.querySelector(".total")
  products.forEach((product) => {
    const productEL = document.createElement("div")
    productEL.classList = "confirmation-order-container"
    const productName = product.querySelector(".selected-product-name")
    const productQuantity = product.querySelector(".order-quantity")
    const productPrice = product.querySelector(".order-price")
    const totalProduct = product.querySelector(".total-product")
    const productExits = isProductInCart(productName)

    productEL.innerHTML = `
    <div class="product-img">
      <img src="/assets/images/image-${productExits.productCategory}-thumbnail.jpg" alt="#" />
    </div>
    <div class="confirmation-info">
      <div class="confirmation-product-name">
        <strong>${productName.textContent}<strong>
      </div>
      <div class="additional-info">
        <div class="confirmation-order-quantity">${productQuantity.textContent}x</div>
        <div class="confirmation-product-price">${productPrice.textContent}</div>
      </div>
    </div>
    <div class="price-total">$${totalProduct.textContent}</div>
  `
    confirmOrderDiv.appendChild(productEL)
  })

  const div2 = document.createElement("div")
  div2.classList = "confirmation-total-container"

  div2.innerHTML = `<div>Order Total</div><div class="total-items">${total.textContent}</div>`
  confirmOrderDiv.appendChild(div2)

  confirmation.style.display = "flex"
  overlay.style.display = "block"
}

confirmation.addEventListener("click", startNewOrder)

function startNewOrder(event) {
  const cartQuantity = cartHTML.querySelector(".cart-quantity")
  const selectedItems = cartHTML.querySelector("#selected-items")
  const quantity = cartQuantity.querySelector("span")

  if (event.target.classList.contains("start-new-order")) {
    cart.length = 0
    quantity.textContent = 0
    selectedItems.innerHTML = ""
    emptyCart(quantity)
    overlay.style.opacity = "0"

    timeoutId = setTimeout(() => {
      confirmation.style.display = "none"
      overlay.style.display = "none"
      confirmOrderDiv.innerHTML = ""
    }, 900)

    confirmation.style.animationName = "animateFromBottom"
    confirmation.style.animationDuration = "1s"
    overlay.style.opacity = "0"
  }
}
