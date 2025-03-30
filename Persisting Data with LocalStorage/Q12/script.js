const themeSelector = document.getElementById("themeSelector");

// Function to apply the selected theme
function applyTheme(theme) {
    document.body.className = theme;
    sessionStorage.setItem("selectedTheme", theme);
}

// Load theme from sessionStorage on page load
window.addEventListener("load", () => {
    const savedTheme = sessionStorage.getItem("selectedTheme") || "light";
    themeSelector.value = savedTheme;
    applyTheme(savedTheme);
});

// Change theme on selection
themeSelector.addEventListener("change", () => {
    applyTheme(themeSelector.value);
});
