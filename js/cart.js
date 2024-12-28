import { isProductInCart } from "../js/script.js"

const cart = []
const cartHTML = document.querySelector(".cart")

export function updateProductInCart(productName) {
  const inIt = isProductInCart(productName)
  const dataName = cartHTML.querySelector(`[data-name="${inIt.id}"]`)
  const orderQuantity = dataName.querySelector(".order-quantity")
  const num = parseFloat(orderQuantity.textContent)
  orderQuantity.textContent = num + 1 + "x"
}

console.log(cart)

export default cart
