document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.getElementById("productGrid");
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }
        const products = await response.json();

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="viewDetails('${product.title}', '${product.price}')">View Details</button>
            `;

            productGrid.appendChild(productCard);
        });

    } catch (error) {
        errorMessage.textContent = "Failed to fetch products. Please try again later.";
        console.error("Error:", error);
    }
});

function viewDetails(title, price) {
    alert(`Product: ${title}\nPrice: $${price}`);
}
