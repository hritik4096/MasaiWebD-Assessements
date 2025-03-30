const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const usernameInput = document.getElementById("username");
const cartSection = document.getElementById("cartSection");
const currentUserSpan = document.getElementById("currentUser");

const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const itemQuantityInput = document.getElementById("itemQuantity");
const addItemBtn = document.getElementById("addItemBtn");
const cartTable = document.getElementById("cartTable");
const totalCostSpan = document.getElementById("totalCost");

let currentUser = null;
let carts = JSON.parse(localStorage.getItem("carts")) || {};

loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        document.getElementById("loginSection").style.display = "none";
        cartSection.style.display = "block";
        currentUserSpan.textContent = username;
        loadCart();
    }
});

logoutBtn.addEventListener("click", () => {
    currentUser = null;
    document.getElementById("loginSection").style.display = "block";
    cartSection.style.display = "none";
    usernameInput.value = "";
});

addItemBtn.addEventListener("click", () => {
    if (!currentUser) return;

    const itemName = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const quantity = parseInt(itemQuantityInput.value);

    if (itemName && price > 0 && quantity > 0) {
        if (!carts[currentUser]) {
            carts[currentUser] = [];
        }

        const existingItem = carts[currentUser].find(item => item.itemName === itemName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            carts[currentUser].push({ itemName, price, quantity });
        }

        saveCart();
        loadCart();

        itemNameInput.value = "";
        itemPriceInput.value = "";
        itemQuantityInput.value = "";
    }
});

function loadCart() {
    cartTable.innerHTML = "";
    totalCostSpan.textContent = "0";

    if (!carts[currentUser]) return;

    let totalCost = 0;
    carts[currentUser].forEach((item, index) => {
        const totalItemCost = item.price * item.quantity;
        totalCost += totalItemCost;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.itemName}</td>
            <td>$${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="editQuantity">
            </td>
            <td>$${totalItemCost}</td>
            <td>
                <button class="removeItem" data-index="${index}">Remove</button>
            </td>
        `;

        cartTable.appendChild(row);
    });

    totalCostSpan.textContent = totalCost;

    document.querySelectorAll(".editQuantity").forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            carts[currentUser][index].quantity = parseInt(e.target.value);
            saveCart();
            loadCart();
        });
    });

    document.querySelectorAll(".removeItem").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            carts[currentUser].splice(index, 1);
            saveCart();
            loadCart();
        });
    });
}

function saveCart() {
    localStorage.setItem("carts", JSON.stringify(carts));
}

