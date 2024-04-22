document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { 
            id: 1, 
            name: "Milanesa a la Napolitana", 
            price: 7900, 
            image: "assets/milanesa.webp", 
            description: "Deliciosa milanesa de ternera cubierta con salsa de tomate, jamón y queso derretido." 
        },
        { 
            id: 2, 
            name: "Pastel de Papas", 
            price: 6800, 
            image: "assets/pastel.jpg", 
            description: "Pastel de carne sazonado, cubierto con una capa de puré de papas dorado en el horno." 
        },
        { 
            id: 3, 
            name: "Tapa de Nalga Caramelizada", 
            price: 8500, 
            image: "assets/tapa.jpg", 
            description: "Ternera de primera calidad, cocida a fuego lento en una salsa de caramelo y especias." 
        },
        { 
            id: 4, 
            name: "Tortilla de Especialidad", 
            price: 5400, 
            image: "assets/tortilla.jpg", 
            description: "Tortilla española con una variedad de ingredientes frescos y sabrosos." 
        }
    ];

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const renderProducts = () => {
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product');
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
            `;
            productsContainer.appendChild(productCard);
        });
    };

    const renderCart = () => {
        const cartContainer = document.querySelector('#cart-items');
        const emptyCartMessage = document.querySelector('#empty-cart-message');
        const emptyCartButton = document.querySelector('#empty-cart');
        const finalizeOrderButton = document.querySelector('#finalize-order');
        cartContainer.innerHTML = '';
        let total = 0;
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            emptyCartButton.style.display = 'none';
            finalizeOrderButton.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            emptyCartButton.style.display = 'block';
            finalizeOrderButton.style.display = 'block';
            
            const groupedCartItems = cartItems.reduce((acc, item) => {
                if (!acc[item.id]) {
                    acc[item.id] = { ...item, quantity: 0 };
                }
                acc[item.id].quantity++;
                return acc;
            }, {});
            
            Object.values(groupedCartItems).forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');
                cartItem.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Eliminar';
                removeButton.dataset.id = item.id;
                removeButton.classList.add('remove-from-cart');
                cartItem.appendChild(removeButton);
                cartContainer.appendChild(cartItem);
                total += item.price * item.quantity;
            });
        }
        document.querySelector('#total').textContent = `Total: $${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const addToCart = productId => {
        const productToAdd = products.find(product => product.id == productId);
        cartItems.push(productToAdd);
        renderCart();
    };

    const removeFromCart = productId => {
        const index = cartItems.findIndex(item => item.id == productId);
        cartItems.splice(index, 1);
        renderCart();
    };

    document.querySelector('#empty-cart').addEventListener('click', () => {
        cartItems.length = 0;
        renderCart();
    });

    document.querySelector('#finalize-order').addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        cartItems.length = 0;
        renderCart();
    });

    document.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.dataset.id;
            addToCart(productId);
        }
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
        }
    });

    renderProducts();
    renderCart();
});
