
// =====================================
// GOALSTORE - PRODUSE
// =====================================

const products = [
    {
        id: 1,
        name: "Nike Mercurial Vapor",
        price: 1499,
        oldPrice: 1799,
        image: "images/mercurial.png",
        category: "Ghete",
        discount: 20,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 2,
        name: "Adidas Predator Elite",
        price: 1699,
        oldPrice: 2099,
        image: "images/predator.png",
        category: "Ghete",
        discount: 20,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 3,
        name: "Nike Phantom GX",
        price: 1399,
        oldPrice: null,
        image: "images/phantom.png",
        category: "Ghete",
        discount: 0,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 4,
        name: "Puma Future Ultimate",
        price: 1299,
        oldPrice: 1499,
        image: "images/puma.png",
        category: "Ghete",
        discount: 15,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 5,
        name: "Nike Mercurial Superfly",
        price: 1599,
        oldPrice: 1899,
        image: "images/mercurial_superfly.png",
        category: "Ghete",
        discount: 15,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 6,
        name: "Adidas Predator Pro",
        price: 1399,
        oldPrice: null,
        image: "images/predator_pro.png",
        category: "Ghete",
        discount: 0,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 7,
        name: "Nike Phantom Luna",
        price: 1499,
        oldPrice: null,
        image: "images/phantom_luna.png",
        category: "Ghete",
        discount: 0,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 8,
        name: "Puma Future Pro",
        price: 1299,
        oldPrice: null,
        image: "images/puma_future_pro.png",
        category: "Ghete",
        discount: 0,
        sizes: [38, 39, 40, 41, 42, 43, 44]
    },
    {
        id: 9,
        name: "Mănuși portar Puma",
        price: 499,
        oldPrice: null,
        image: "images/manusi_portar_puma.png",
        category: "Portari",
        discount: 0
    },
    {
        id: 10,
        name: "Tricou antrenament Barça",
        price: 399,
        oldPrice: null,
        image: "images/tricou_antrenament_barca.png",
        category: "Echipament",
        discount: 0,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 11,
        name: "Geantă sport Nike",
        price: 599,
        oldPrice: null,
        image: "images/geanta_sport_nike.png",
        category: "Genti",
        discount: 0
    },
    {
        id: 12,
        name: "Apărători fotbal Adidas",
        price: 199,
        oldPrice: null,
        image: "images/aparatori_fotbal_adidas.png",
        category: "Accesorii",
        discount: 0
    }
];

// =====================================
// ELEMENTE HTML
// =====================================

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("empty-message");

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const productModal = document.getElementById("product-modal");
const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");

const productDetails = document.getElementById("product-details");

let selectedCategory = "Toate";

// =====================================
// SALVARE COȘ
// =====================================

function loadCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem("goalstore-cart")
        );

        return Array.isArray(savedCart) ? savedCart : [];
    } catch {
        return [];
    }
}

let cart = loadCart();

function saveCart() {
    localStorage.setItem(
        "goalstore-cart",
        JSON.stringify(cart)
    );
}

// =====================================
// FORMATARE PREȚ
// =====================================

function formatPrice(price) {
    return price.toLocaleString("ro-MD") + " MDL";
}

// =====================================
// AFIȘARE PRODUSE
// =====================================

function displayProducts() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "Toate" ||
            (selectedCategory === "Promotii"
                ? product.discount > 0
                : product.category === selectedCategory);

        return matchesSearch && matchesCategory;
    });

    productList.innerHTML = "";

    emptyMessage.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach(product => {
        const oldPriceHTML = product.oldPrice
            ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>`
            : "";

        const discountHTML = product.discount
            ? `<span class="discount">-${product.discount}%</span>`
            : "";

        productList.innerHTML += `
            <article class="product-card">
                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    data-details="${product.id}"
                    loading="lazy"
                    onerror="this.alt='Imagine indisponibilă'"
                >

                <h3>${product.name}</h3>

                <p class="product-price">
                    ${oldPriceHTML}
                    ${formatPrice(product.price)}
                    ${discountHTML}
                </p>

                <div class="product-actions">
                    <button
                        class="details-button"
                        data-details="${product.id}">
                        DETALII
                    </button>

                    <button
                        data-add="${product.id}">
                        ADAUGĂ
                    </button>
                </div>
            </article>
        `;
    });
}

// =====================================
// FILTRARE CATEGORII
// =====================================

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        displayProducts();
    });
});

// =====================================
// CĂUTARE
// =====================================

searchInput.addEventListener("input", displayProducts);

// =====================================
// DESCHIDERE / ÎNCHIDERE FERESTRE
// =====================================

function openModal(modal) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    modal.classList.remove("show");

    if (!document.querySelector(".overlay.show")) {
        document.body.style.overflow = "";
    }
}

document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.getElementById(button.dataset.close);
        closeModal(modal);
    });
});

document.querySelectorAll(".overlay").forEach(overlay => {
    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeModal(overlay);
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".overlay.show").forEach(modal => {
            closeModal(modal);
        });
    }
});

// =====================================
// DETALII PRODUS
// =====================================

function showProductDetails(id) {
    const product = products.find(item => item.id === Number(id));

    if (!product) return;

    const sizeHTML = product.sizes
        ? `
            <label for="product-size">Alege mărimea:</label>
            <select id="product-size">
                <option value="">Alege mărimea</option>
                ${product.sizes.map(size =>
                    `<option value="${size}">${size}</option>`
                ).join("")}
            </select>
        `
        : "";

    productDetails.innerHTML = `
        <img class="detail-image" src="${product.image}" alt="${product.name}">

        <h2>${product.name}</h2>

        <p class="detail-price">
            ${formatPrice(product.price)}
        </p>

        <p class="detail-description">
            Categoria: ${product.category}<br>
            Produs disponibil în catalogul GoalStore.
        </p>

        ${sizeHTML}

        <button class="main-button full-button" id="detail-add">
            ADAUGĂ ÎN COȘ
        </button>
    `;

    document.getElementById("detail-add").addEventListener("click", () => {
        let size = "";

        if (product.sizes) {
            size = document.getElementById("product-size").value;

            if (!size) {
                alert("Te rugăm să alegi mărimea!");
                return;
            }
        }

        addToCart(product.id, size);
        closeModal(productModal);
    });

    openModal(productModal);
}

// =====================================
// ADAUGARE ÎN COȘ
// =====================================

function addToCart(id, size = "") {
    const product = products.find(item => item.id === Number(id));

    if (!product) return;

    if (product.sizes && !size) {
        showProductDetails(id);
        return;
    }

    const existingItem = cart.find(item =>
        item.id === product.id && item.size === size
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            size: size,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    alert("Produsul a fost adăugat în coș!");
}

// =====================================
// BUTOANE PRODUSE
// =====================================

productList.addEventListener("click", event => {
    const detailsButton = event.target.closest("[data-details]");
    const addButton = event.target.closest("[data-add]");

    if (detailsButton) {
        showProductDetails(detailsButton.dataset.details);
    }

    if (addButton) {
        addToCart(addButton.dataset.add);
    }
});

// =====================================
// ACTUALIZARE COȘ
// =====================================

function updateCart() {
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="cart-empty">Coșul tău este gol.</p>
        `;
    }

    cart.forEach(item => {
        const product = products.find(product =>
            product.id === item.id
        );

        if (!product) return;

        const subtotal = product.price * item.quantity;
        total += subtotal;

        const sizeText = item.size
            ? `Mărime: ${item.size}`
            : "";

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">

                <div>
                    <h3>${product.name}</h3>
                    <p>${formatPrice(subtotal)}</p>
                    <small>${sizeText}</small>

                    <div class="quantity-controls">
                        <button data-minus="${item.id}" data-size="${item.size}">−</button>

                        <span>${item.quantity}</span>

                        <button data-plus="${item.id}" data-size="${item.size}">+</button>
                    </div>
                </div>

                <button
                    class="remove-button"
                    data-remove="${item.id}"
                    data-size="${item.size}">
                    ȘTERGE
                </button>
            </div>
        `;
    });

    cartTotal.textContent = formatPrice(total);

    document.getElementById("checkout-button").disabled =
        cart.length === 0;
}

// =====================================
// MODIFICARE CANTITATE / ȘTERGERE
// =====================================

cartItems.addEventListener("click", event => {
    const plus = event.target.closest("[data-plus]");
    const minus = event.target.closest("[data-minus]");
    const remove = event.target.closest("[data-remove]");

    if (plus) {
        const item = cart.find(item =>
            item.id === Number(plus.dataset.plus) &&
            item.size === plus.dataset.size
        );

        if (item) item.quantity++;
    }

    if (minus) {
        const item = cart.find(item =>
            item.id === Number(minus.dataset.minus) &&
            item.size === minus.dataset.size
        );

        if (item) {
            item.quantity--;

            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem !== item);
            }
        }
    }

    if (remove) {
        cart = cart.filter(item =>
            !(item.id === Number(remove.dataset.remove) &&
              item.size === remove.dataset.size)
        );
    }

    saveCart();
    updateCart();
});

// =====================================
// DESCHIDERE COȘ
// =====================================

document.getElementById("open-cart").addEventListener("click", () => {
    updateCart();
    openModal(cartModal);
});

// =====================================
// FINALIZARE COMANDĂ
// =====================================

document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) return;

    closeModal(cartModal);
    document.getElementById("order-result").textContent = "";
    document.getElementById("checkout-form").reset();

    openModal(checkoutModal);
});

document.getElementById("checkout-form").addEventListener("submit", event => {
    event.preventDefault();

    if (cart.length === 0) return;

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("Completează toate câmpurile!");
        return;
    }

    const orderNumber = "GS-" + Date.now().toString().slice(-7);

    document.getElementById("order-result").innerHTML = `
        <h3>Comandă demonstrativă creată!</h3>
        <p>Număr comandă: ${orderNumber}</p>
        <p>Client: ${name.replace(/[&<>"']/g, "")}</p>
        <p>Telefon: ${phone.replace(/[&<>"']/g, "")}</p>
        <p>Adresă: ${address.replace(/[&<>"']/g, "")}</p>
        <p>Total: ${cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0)} MDL</p>
        <p>Această comandă nu a fost trimisă unui magazin real.</p>
    `;

    cart = [];
    saveCart();
    updateCart();

    document.getElementById("checkout-form").reset();
});

// =====================================
// PORNIRE MAGAZIN
// =====================================

displayProducts();
updateCart();
