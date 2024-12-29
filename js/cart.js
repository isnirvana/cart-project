import { isProductInCart } from "../js/script.js"

const cart = []
const cartHTML = document.querySelector(".cart")

let total = 0

export function updateProductInCart(productName, productPrice) {
  const inIt = isProductInCart(productName)
  const dataName = cartHTML.querySelector(`[data-name="${inIt.id}"]`)
  const orderQuantity = dataName.querySelector(".order-quantity")
  const num = parseFloat(orderQuantity.textContent)
  orderQuantity.textContent = num + 1

  let totalProduct = dataName.querySelector(".total-product")
  let a = parseFloat(totalProduct.textContent)
  let b = (totalProduct.textContent = (
    parseFloat(productPrice.textContent) + a
  ).toFixed(2))
}

export function calcOrderTotal(productPrice) {
  const orderTotal = document.querySelector(".total")
  total += parseFloat(productPrice.textContent)

  orderTotal.textContent = `$${total.toFixed(2)}`
}

export default cart
