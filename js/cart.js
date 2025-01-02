import { isProductInCart, cartProducts } from "../js/script.js"

const cartHTML = document.querySelector(".cart")
const cartQuantity = document.querySelector(".cart-quantity")
const empty = document.querySelector(".empty")
const show = document.querySelectorAll(".show")
let cart = []

let total = 0

export function updateProductInCart(productName, productPrice) {
  const inIt = isProductInCart(productName)
  const dataName = cartHTML.querySelector(`[data-name="${inIt.id}"]`)
  const orderQuantity = dataName.querySelector(".order-quantity")
  const num = parseFloat(orderQuantity.textContent)
  orderQuantity.textContent = num + 1

  let totalProduct = dataName.querySelector(".total-product")
  let a = parseFloat(totalProduct.textContent)
  totalProduct.textContent = (parseFloat(productPrice.textContent) + a).toFixed(
    2
  )
}

export function calcOrderTotal(productPrice) {
  const orderTotal = document.querySelector(".total")
  total += parseFloat(productPrice.textContent)
  orderTotal.textContent = `$${total.toFixed(2)}`
}

cartHTML.addEventListener("click", removeFromCart)

function removeFromCart(event) {
  if (event.target.classList.contains("delete-img")) {
    const targetEvent = event.target.closest(".selected-product-container")
    const productName = targetEvent.querySelector("strong")
    const orderQuantity = targetEvent.querySelector(".order-quantity")
    const totalProduct = targetEvent.querySelector(".total-product")
    const inIt = isProductInCart(productName)
    const filterdCart = cart.filter((item) => {
      return item.id !== inIt.id
    })

    cart.length = 0
    filterdCart.forEach((element) => {
      cart.push(element)
    })

    const hr = targetEvent.nextElementSibling
    cartProducts.removeChild(targetEvent)
    cartProducts.removeChild(hr)
    
    const quantity = cartQuantity.querySelector("span")
    quantity.textContent =
      parseFloat(quantity.textContent) - parseFloat(orderQuantity.textContent)
    const orderTotal = cartHTML.querySelector(".total")
    const calcTotal = parseFloat(orderTotal.textContent.slice(1)) - parseFloat(totalProduct.textContent)
    orderTotal.textContent = `$${calcTotal.toFixed(2)}`
    total = calcTotal
    
    if (parseFloat(quantity.textContent) === 0) {
      empty.style.display = "flex"
      show.forEach((element) => {
        element.classList.add("show")
      })
    }
  }
}

export default cart
