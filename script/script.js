async function post() {
    try {
        const allData = await fetch("https://fakestoreapi.com/products");
        const newData = await allData.json();
        newData.forEach((post) => {
            let { image, title, price } = post;
            const parentDiv = document.getElementById('div-parrent');
            const div = document.createElement('div');
            div.className = "col-sm-6 col-md-4 col-lg-3 ";
            div.innerHTML = `
               <div class="d-flex h-100 w-100 flex-column justify-content-between ">
                    <div class="d-flex justify-content-center align-items-center h-100 w-100 mb-3">
                        <img src="${image}" class="img-fluid img-size p-1" alt="${title}">
                    </div>
                    <div>
                        <h3 class="fs-6">${title}</h3>
                        <p class="para m-0 mb-1">Price $${price}</p>
                        <p class="para m-0 mb-1">Rating ${post.rating.rate}</p>
                        <div class="d-flex flex-column mt-4">
                            <button class="add-to-cart-btn btn btn-danger">Add to Cart</button>
                        </div>
                    </div>
               </div>  
            `;

            parentDiv.appendChild(div);

            const addToCartBtn = div.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', () => addToCart(post));
        });
    } catch (error) {
        console.error("API is not working", error);
    }
}
post();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemTotalPrice = item.price * item.quantity;
        total += itemTotalPrice;

        cartItem.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
            <img src="${item.image}" width="50px" alt="${item.title}">
            <h6 class="fs-7 w-25">${item.title}</h6>
            <p class="fs-7">Price: <br> $${item.price}</p>
            <p class="fs-7 d-flex align-items-center"> 
                <button class="btn " onclick="decreaseQuantity(${item.id})">-</button>
                ${item.quantity}
                <button class="btn " onclick="increaseQuantity(${item.id})">+</button>
            </p>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    const totalPriceElement = document.getElementById('total-data');
    totalPriceElement.className = 'cart-total';
    totalPriceElement.innerHTML = `<h6>Total Price: $${total.toFixed(2)}</h6>`;
}

function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); 
    }
}

function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);

    if (product) {
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); 
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); 
}

displayCart(); 