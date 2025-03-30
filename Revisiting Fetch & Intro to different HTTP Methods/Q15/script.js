const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const productCount = document.getElementById("productCount");

let products = [];

// Fetch products and categories
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
        displayProducts(products);

        // Fetch categories dynamically
        const categoryResponse = await fetch("https://fakestoreapi.com/products/categories");
        const categories = await categoryResponse.json();
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        productGrid.innerHTML = `<p style="color: red;">Failed to load products. Try again later.</p>`;
    }
}

// Display products
function displayProducts(productList) {
    productGrid.innerHTML = "";
    productCount.textContent = `Showing ${productList.length} products`;

    productList.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title.substring(0, 25)}...</h4>
            <p class="price">$${product.price}</p>
        `;

        productGrid.appendChild(card);
    });
}

// Filter products
function filterProducts() {
    let filteredProducts = products;

    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchText)
        );
    }

    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    const sortOption = sortPrice.value;
    if (sortOption === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortPrice.addEventListener("change", filterProducts);

// Initial fetch
fetchProducts();
