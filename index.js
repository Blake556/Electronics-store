if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeButtons = document.querySelectorAll('.item-remove-btn')
        for(let i = 0; i < removeButtons.length; i++) {
            let removeButton = removeButtons[i]
            removeButton.addEventListener('click', removeElementButton)
        }

    let quantitySelectors = document.querySelectorAll('.item-quantity-selector')
        for(let i = 0; i < quantitySelectors.length; i++) {
            let quantitySelector = quantitySelectors[i]
            quantitySelector.addEventListener('change', updateCartTotal)
    }


    let addToCartElements = document.querySelectorAll('.add-to-cart-btn')
        for(let i = 0; i < addToCartElements.length; i++) {
            let addToCartElement = addToCartElements[i]
            
            addToCartElement.addEventListener('click', addToCartButton)
        }
    
    document.querySelector('.buy-btn').addEventListener('click', purchaseButton)
}


function EmptyCart() {
    let defaultMsgElement = document.querySelector('.default-msg-container')
    let cartrow = document.querySelector('.cart-row')

    if (cartrow == null ) {
        defaultMsgElement.style.display = 'block';
    } else {
        defaultMsgElement.style.display = "none";
    } 
}



function purchaseButton() {
    let cartRow = document.querySelector('.cart-row')

        if (cartRow == null ) {
        alert('No Items in Cart: Add items to cart to purchase')
        } else {
            alert('Order placed, thanks')
        }

    let cartItems = document.querySelector('.cart-items')
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
            updateCartTotal()
            EmptyCart()
        }
}

function removeElementButton(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    EmptyCart()
}

function addToCartButton(event) {
    let buttonClicked = event.target
    let ElementClicked = buttonClicked.parentElement
    let productImg = ElementClicked.querySelectorAll('.product-img')[0].src
    let productName = ElementClicked.querySelectorAll('.product-name')[0].innerText
    let productPrice = ElementClicked.querySelectorAll('.product-price')[0].innerText
        addToCart(productImg, productName, productPrice)
        updateCartTotal()
        EmptyCart()
}

function addToCart(productImg, productName, productPrice) {
    let createRow = document.createElement('div')
    createRow.classList.add('cart-row')
    let cartItems = document.querySelector('.cart-items')
    let cartItemName = document.querySelectorAll('.cart-item')

        for(let i = 0; i < cartItemName.length; i++) {
            if (cartItemName[i].innerText == productName)  {
                alert('Item has already been added')
                return
            }
        }
    let cartRowContent = 
            `   
                <div class='cart-image-container'>
                <img class='cart-img' src='${productImg}'>
               </div>
                <div >
                    <h3 class='cart-item'>${productName}</h3>
                </div>
                <select class='item-quantity-selector' name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <div class='price-remove-container'>
                    <h3 class='item-price'>${productPrice}</h3>
                    <p class='item-remove-btn btn btn-danger'>Remove</p>
                </div>
                
            ` 
        createRow.innerHTML = cartRowContent
        cartItems.append(createRow)
        createRow.querySelector('.item-remove-btn').addEventListener('click', removeElementButton)
        createRow.querySelector('.item-quantity-selector').addEventListener('change', updateCartTotal)
}

function updateCartTotal() {
    let cartItems = document.querySelectorAll('.cart-items')[0]
    let cartRows = cartItems.querySelectorAll('.cart-row')
    total = 0
     for(let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.querySelectorAll('.item-price')[0] 
        let quantityElement = cartRow.querySelectorAll('.item-quantity-selector')[0]
        let price = parseFloat(priceElement.innerText.replace('$', '').replace(',', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)    
     }   
    document.querySelector('.total-number').innerText = '$' + total.toLocaleString() + '.00'
}

