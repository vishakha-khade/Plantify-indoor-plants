let cart = JSON.parse(localStorage.getItem("plantCart")) || [];

let users = JSON.parse(localStorage.getItem("plantUsers")) || [];

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Plant products

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

// Mobile menu

function toggleMenu() {

    const nav = document.getElementById("navLinks");

    if (nav) {
        nav.classList.toggle("active");
    }
}

// Cart count

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerHTML = cart.length;
    }
}

// Shop products

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

// Add to cart

function addToCart(index) {

    const selectedPlant = plants[index];

    cart.push(selectedPlant);

    localStorage.setItem("plantCart", JSON.stringify(cart));

    updateCartCount();

    alert(selectedPlant.name + " added to your bag!");
}

// Search

function searchPlants() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const value = searchInput.value.toLowerCase();

    const result = plants.filter(function(plant) {

        return plant.name.toLowerCase().includes(value);

    });

    displayPlants(result);
}

// Category filter

function filterPlants() {

    const category = document.getElementById("categoryFilter").value;

    if (category == "All") {

        displayPlants(plants);

    } else {

        const result = plants.filter(function(plant) {

            return plant.type == category;

        });

        displayPlants(result);
    }
}

// Price sorting

function sortPlants() {

    const sortValue = document.getElementById("sortPlants").value;

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

// Newsletter

function subscribeUser(event) {

    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    const message = document.getElementById("newsletterMessage");

    if (email == "") {

        message.innerHTML = "Please enter your email.";

    } else {

        message.innerHTML = "Thank you for joining Plantify!";

        document.getElementById("newsletterEmail").value = "";
    }
}

// Contact form

function submitContact(event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactText").value;

    const result = document.getElementById("contactMessage");

    if (name == "" || email == "" || message == "") {

        result.innerHTML = "Please fill all the fields.";

    } else {

        result.innerHTML = "Thank you! Your message has been submitted successfully.";

        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactText").value = "";
    }
}

// Plant recommendation

function recommendPlant(type) {

    const result = document.getElementById("quizResult");

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


// SIGN UP

function signupUser(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

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

    localStorage.setItem("plantUsers", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";
}

// LOGIN

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

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

        window.location.href = "../index.html";

    } else {

        alert("Invalid email or password.");
    }
}

// LOGOUT

function logoutUser() {

    localStorage.removeItem("currentUser");

    alert("You have been logged out.");

    window.location.reload();
}

// USER STATUS

function checkLogin() {

    const loginLink = document.getElementById("loginLink");

    const logoutButton = document.getElementById("logoutButton");

    const userName = document.getElementById("userName");

    if (currentUser) {

        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (logoutButton) {
            logoutButton.style.display = "inline-block";
        }

        if (userName) {
            userName.innerHTML = "Hi, " + currentUser.name;
        }

    } else {

        if (logoutButton) {
            logoutButton.style.display = "none";
        }
    }
}

// DISPLAY CART

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    const totalPrice = document.getElementById("totalPrice");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length == 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        if (totalPrice) {
            totalPrice.innerHTML = "₹0";
        }

        return;
    }

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${cart[i].image}" alt="${cart[i].name}">

                <div class="cart-item-info">

                    <h3>${cart[i].name}</h3>

                    <p>${cart[i].type}</p>

                    <strong>₹${cart[i].price}</strong>

                    <br><br>

                    <button onclick="removeFromCart(${i})">
                        Remove
                    </button>

                </div>
            </div>
        `;
    }

    if (totalPrice) {
        totalPrice.innerHTML = "₹" + total;
    }
}

// Remove cart item

function removeFromCart(index) {
    cart.splice(index, 1);

    localStorage.setItem("plantCart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
}

// CHECKOUT

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

    window.location.href = "checkout.html";
}

// PLACE ORDER

function placeOrder(event) {

    event.preventDefault();

    if (!currentUser) {

        alert("Please login first.");
        return;
    }

    if (cart.length == 0) {

        alert("Your cart is empty.");
        return;
    }

    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    if (address == "" || payment == "") {

        alert("Please fill all the details.");

        return;
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total + cart[i].price;
    }

    const order = {

        user: currentUser.email,

        items: cart,

        total: total,

        address: address,

        payment: payment
    };

    localStorage.setItem(
        "plantOrder",
        JSON.stringify(order)
    );

    cart = [];

    localStorage.setItem(
        "plantCart",
        JSON.stringify(cart)
    );

    alert("Your order has been placed successfully!");

    window.location.href = "../index.html";
}

// START FUNCTIONS


updateCartCount();
displayCart();
checkLogin();