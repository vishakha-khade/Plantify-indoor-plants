let cart = JSON.parse(localStorage.getItem("plantCart")) || [];
let users = JSON.parse(localStorage.getItem("plantUsers")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let orders = JSON.parse(localStorage.getItem("plantOrders")) || [];

const plants = [
    {
        name: "Monstera Deliciosa",
        type: "Indoor",
        price: 899,
        image: "../assets/monsteraplant.jpg"
    },
    {
        name: "Snake Plant",
        type: "Easy Care",
        price: 599,
        image: "../assets/snake.jpg"
    },
    {
        name: "Peace Lily",
        type: "Flowering",
        price: 749,
        image: "../assets/peace-lily.jpg"
    },
    {
        name: "Golden Pothos",
        type: "Indoor",
        price: 499,
        image: "../assets/golden-pothos.jpg"
    },
    {
        name: "Fiddle Leaf Fig",
        type: "Indoor",
        price: 1299,
        image: "../assets/fiddle-leaf.jpg"
    },
    {
        name: "Little Succulent",
        type: "Succulent",
        price: 299,
        image: "../assets/littile-succulent.jpg"
    }
];

function toggleMenu() {
    const nav = document.getElementById("navLinks");

    if (nav) {
        nav.classList.toggle("active");
    }
}

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerHTML = cart.length;
    }
}

function displayPlants(list) {
    const productGrid = document.getElementById("productGrid");

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    for (let i = 0; i < list.length; i++) {

        const plant = list[i];
        const originalIndex = plants.indexOf(plant);

        productGrid.innerHTML += `
            <div class="product-card">

                <img src="${plant.image}" alt="${plant.name}">

                <div class="product-info">

                    <h3>${plant.name}</h3>

                    <p>${plant.type}</p>

                    <div class="product-bottom">

                        <strong>₹${plant.price}</strong>

                        <button onclick="addToCart(${originalIndex})">
                            Add
                        </button>

                    </div>

                </div>

            </div>
        `;
    }
}

displayPlants(plants);

function addToCart(index) {

    const selectedPlant = plants[index];

    cart.push(selectedPlant);

    localStorage.setItem(
        "plantCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(selectedPlant.name + " added to your bag!");
}

function searchPlants() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const value = searchInput.value.toLowerCase();

    const result = plants.filter(function(plant) {

        return plant.name
            .toLowerCase()
            .includes(value);

    });

    displayPlants(result);
}

function filterPlants() {

    const category =
        document.getElementById("categoryFilter").value;

    if (category == "All") {

        displayPlants(plants);

    } else {

        const result = plants.filter(function(plant) {

            return plant.type == category;

        });

        displayPlants(result);
    }
}

function sortPlants() {

    const sortValue =
        document.getElementById("sortPlants").value;

    let sortedPlants = [...plants];

    if (sortValue == "low") {

        sortedPlants.sort(function(a, b) {
            return a.price - b.price;
        });

    } else if (sortValue == "high") {

        sortedPlants.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    displayPlants(sortedPlants);
}

function subscribeUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("newsletterEmail").value;

    const message =
        document.getElementById("newsletterMessage");

    if (email == "") {

        message.innerHTML =
            "Please enter your email.";

    } else {

        message.innerHTML =
            "Thank you for joining Plantify!";

        document.getElementById("newsletterEmail").value = "";
    }
}

function submitContact(event) {

    event.preventDefault();

    const name =
        document.getElementById("contactName").value;

    const email =
        document.getElementById("contactEmail").value;

    const message =
        document.getElementById("contactText").value;

    const result =
        document.getElementById("contactMessage");

    if (name == "" || email == "" || message == "") {

        result.innerHTML =
            "Please fill all the fields.";

    } else {

        result.innerHTML =
            "Thank you! Your message has been submitted successfully.";

        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactText").value = "";
    }
}

function recommendPlant(type) {

    const result =
        document.getElementById("quizResult");

    if (!result) {
        return;
    }

    if (type == "beginner") {

        result.innerHTML =
            "We recommend a Snake Plant. It is easy to care for.";

    } else if (type == "flower") {

        result.innerHTML =
            "We recommend a Peace Lily for a soft flowering look.";

    } else {

        result.innerHTML =
            "We recommend a Monstera for a bold green statement.";
    }
}


/* SIGN UP */

function signupUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;

    if (name == "" || email == "" || password == "") {

        alert("Please fill all the fields.");
        return;
    }

    for (let i = 0; i < users.length; i++) {

        if (users[i].email == email) {

            alert("This email is already registered.");
            return;
        }
    }

    const newUser = {

        name: name,
        email: email,
        password: password
    };

    users.push(newUser);

    localStorage.setItem(
        "plantUsers",
        JSON.stringify(users)
    );

    alert("Account created successfully!");

    window.location.href = "login.html";
}


/* LOGIN */

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {

        if (
            users[i].email == email &&
            users[i].password == password
        ) {

            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(foundUser)
        );

        alert("Login successful!");

        window.location.href = "account.html";

    } else {

        alert("Invalid email or password.");
    }
}


/* LOGOUT */

function logoutUser() {

    localStorage.removeItem("currentUser");

    currentUser = null;

    alert("You have been logged out.");

    window.location.href = "../index.html";
}


/* USER STATUS */

function checkLogin() {

    const loginLink =
        document.getElementById("loginLink");

    const logoutButton =
        document.getElementById("logoutButton");

    const userName =
        document.getElementById("userName");

    if (currentUser) {

        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (logoutButton) {
            logoutButton.style.display = "inline-block";
        }

        if (userName) {

            const firstName =
                currentUser.name.split(" ")[0];

            userName.innerHTML =
                "Hi, " + firstName;
        }

    } else {

        if (logoutButton) {
            logoutButton.style.display = "none";
        }
    }
}


/* CART */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalPrice =
        document.getElementById("totalPrice");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length == 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

        if (totalPrice) {
            totalPrice.innerHTML = "₹0";
        }

        return;
    }

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${cart[i].image}"
                    alt="${cart[i].name}"
                >

                <div class="cart-item-info">

                    <h3>${cart[i].name}</h3>

                    <p>${cart[i].type}</p>

                    <strong>₹${cart[i].price}</strong>

                    <div class="cart-actions">

                        <button
                            onclick="buyNow(${i})"
                            class="buy-button"
                        >
                            Buy Now
                        </button>

                        <button
                            onclick="removeFromCart(${i})"
                            class="remove-button"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;
    }

    if (totalPrice) {
        totalPrice.innerHTML = "₹" + total;
    }
}


/* REMOVE ONE ITEM */

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "plantCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();
}


/* BUY ONE ITEM */

function buyNow(index) {

    if (!currentUser) {

        alert("Please login before buying.");

        window.location.href = "login.html";

        return;
    }

    localStorage.setItem(
        "checkoutItem",
        index
    );

    localStorage.setItem(
        "checkoutType",
        "single"
    );

    window.location.href = "checkout.html";
}


/* CHECKOUT ALL */

function goToCheckout() {

    if (cart.length == 0) {

        alert("Your cart is empty.");
        return;
    }

    if (!currentUser) {

        alert("Please login before checkout.");

        window.location.href = "login.html";

        return;
    }

    localStorage.removeItem("checkoutItem");

    localStorage.setItem(
        "checkoutType",
        "all"
    );

    window.location.href = "checkout.html";
}


/* CHECKOUT PAGE */

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    let checkoutCart = [];

    const checkoutType =
        localStorage.getItem("checkoutType");

    if (checkoutType == "single") {

        const index =
            Number(localStorage.getItem("checkoutItem"));

        if (cart[index]) {
            checkoutCart.push(cart[index]);
        }

    } else {

        checkoutCart = cart;
    }

    let total = 0;

    for (let i = 0; i < checkoutCart.length; i++) {

        total =
            total + checkoutCart[i].price;

        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img
                    src="${checkoutCart[i].image}"
                    alt="${checkoutCart[i].name}"
                >

                <div>
                    <h3>${checkoutCart[i].name}</h3>
                    <p>${checkoutCart[i].type}</p>
                    <strong>₹${checkoutCart[i].price}</strong>
                </div>

            </div>
        `;
    }

    checkoutTotal.innerHTML =
        "₹" + total;
}

/* PLACE ORDER */

function placeOrder(event) {

    event.preventDefault();

    if (!currentUser) {

        alert("Please login first.");
        return;
    }

    const address =
        document.getElementById("address").value;

    const payment =
        document.getElementById("payment").value;

    if (address == "" || payment == "") {

        alert("Please fill all the details.");
        return;
    }

    const checkoutType =
        localStorage.getItem("checkoutType");

    let orderedItems = [];

    if (checkoutType == "single") {

        const index =
            Number(localStorage.getItem("checkoutItem"));

        if (cart[index]) {

            orderedItems.push(cart[index]);

            cart.splice(index, 1);
        }

    } else {

        orderedItems = [...cart];

        cart = [];
    }

    let total = 0;

    for (let i = 0; i < orderedItems.length; i++) {

        total =
            total + orderedItems[i].price;
    }

    const order = {

        user: currentUser.email,

        items: orderedItems,

        total: total,

        address: address,

        payment: payment,

        date: new Date().toLocaleString()
    };

    orders.push(order);

    localStorage.setItem(
        "plantOrders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "plantCart",
        JSON.stringify(cart)
    );

    localStorage.removeItem("checkoutItem");
    localStorage.removeItem("checkoutType");

    alert("Your order has been placed successfully!");

    window.location.href = "account.html";
}


/* ACCOUNT */

function displayAccount() {

    const accountName =
        document.getElementById("accountName");

    const accountEmail =
        document.getElementById("accountEmail");

    const accountCartCount =
        document.getElementById("accountCartCount");

    const accountCartTotal =
        document.getElementById("accountCartTotal");

    const orderList =
        document.getElementById("orderList");

    if (!accountName) {
        return;
    }

    if (!currentUser) {

        window.location.href = "login.html";
        return;
    }

    const firstName =
        currentUser.name.split(" ")[0];

    accountName.innerHTML =
        firstName;

    accountEmail.innerHTML =
        currentUser.email;

    accountCartCount.innerHTML =
        cart.length;

    let cartTotal = 0;

    for (let i = 0; i < cart.length; i++) {

        cartTotal =
            cartTotal + cart[i].price;
    }

    accountCartTotal.innerHTML =
        "₹" + cartTotal;

    const userOrders =
        orders.filter(function(order) {

            return order.user == currentUser.email;

        });

    orderList.innerHTML = "";

    if (userOrders.length == 0) {

        orderList.innerHTML =
            "<p>No orders yet.</p>";

    } else {

        for (let i = userOrders.length - 1; i >= 0; i--) {

            orderList.innerHTML += `

                <div class="order-card">

                    <h3>Order ${userOrders.length - i}</h3>

                    <p>
                        Date: ${userOrders[i].date}
                    </p>

                    <p>
                        Items: ${userOrders[i].items.length}
                    </p>

                    <strong>
                        Total: ₹${userOrders[i].total}
                    </strong>

                </div>
            `;
        }
    }
}

/* START */

updateCartCount();
displayCart();
displayCheckout();
displayAccount();
checkLogin();