// IMPORTS AND VARIABLES
import { menuArray, test } from './data.js'
import { v4 as uniqueId } from 'https://jspm.dev/uuid';
//---------------------
const orderingSection = document.getElementById('ordering-section')
const confirmItems = document.getElementById('confirm-items')
const totalPrice = document.getElementById('total-price')
const completeOrderBtn = document.getElementById('complete-order-btn')
const modal = document.getElementById('modal')
const preCheckout = document.getElementById('pre-checkout')
const payBtn = document.getElementById('pay-btn')
const finalMessageSection = document.getElementById('final-message-section')
const paymentForm = document.getElementById('payment-form')
const addBtnArr = document.getElementsByClassName('add-btn')
const pageWrapper = document.getElementById('page-wrapper')
let thank = false

// EVENTS
document.addEventListener('click', function(e) {
    if(e.target.dataset.addBtn) {
        addItem(e.target.dataset.addBtn)
    }
    else if(e.target.id === 'complete-order-btn') {
        discloseModal()
    }
    else if(e.target.dataset.removeBtn) {
        e.preventDefault()
        removeItem(e.target.dataset.removeBtn)
    } 
})

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    thank = true
    orderingSectionHtml()
    
    for(let button of addBtnArr) {
        button.disabled = true
    }
})
// FUNCTIONS 
function orderingSectionHtml() {
    
    let foodHtml = ''
    
    menuArray.forEach((foodObj) => {
        
        foodObj.uniqueId = uniqueId()
        
        foodHtml += `
        <div class="food-item">
            <div class="food-info">
                <p class="food-emoji">${foodObj.emoji}</p>
                <div class="food-info-text">
                    <h3 class="food-name">${foodObj.name}</h3>
                    <p class="ingredients">${foodObj.ingredients}</p>
                    <p class="price">$${foodObj.price}</p> 
                </div>
            </div>
            <button class="add-btn" data-add-btn="${foodObj.uniqueId}">+</button>
        </div>
    `
    })
    
    if(thank) {
        preCheckout.classList.add('hidden')
        modal.classList.add('hidden')
        finalMessageSection.classList.remove('hidden')
    }
    
    orderingSection.innerHTML = foodHtml
}

orderingSectionHtml()
// --------------------------------
let updatedPrice = 0

function addItem(foodId) {
    
    preCheckout.classList.remove('hidden')
    
    menuArray.forEach((foodObj) => {
        
        if(foodObj.uniqueId === foodId) {
            
            updatedPrice += foodObj.price
            
            confirmItems.innerHTML += `
                <div id="remove-item-${foodObj.uniqueId}" class="confirm-items-inner">
                    <div class="confirm-item-name">
                        <h2>${foodObj.name}</h2>
                        <a href="#" data-remove-btn="${foodObj.uniqueId}" class="remove-item-btn">remove</a>
                    </div>
                    <p class="confirm-price" id="price-${foodObj.uniqueId}">$${foodObj.price}</p>
                </div>
            `
        }
    })
    
    totalPrice.textContent = `$${updatedPrice}`
}
// --------------------------------
function discloseModal() {
    
    for(let button of addBtnArr) {
        button.disabled = true
    }
    completeOrderBtn.disabled = true
    
    modal.classList.remove('hidden')
    pageWrapper.classList.add('dim-bg')
}
// -------------------------------
function removeItem(foodId) {
    let itemToRemove = document.getElementById(`remove-item-${foodId}`)
    let priceId = document.getElementById(`price-${foodId}`)
    
    updatedPrice -= +priceId.textContent.slice(1)
    itemToRemove.remove()
    totalPrice.textContent = `$${updatedPrice}`
    
    if(updatedPrice === 0) {
        preCheckout.classList.add('hidden')
    }
}
