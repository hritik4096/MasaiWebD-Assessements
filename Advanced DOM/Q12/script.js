document.getElementById("item2").addEventListener("click", function () {
    const parent = this.parentNode;
    alert("Parent node content: " + parent.textContent.trim());

    const prevSibling = this.previousElementSibling;
    const nextSibling = this.nextElementSibling;

    if (prevSibling) {
        console.log("Previous sibling content: " + prevSibling.textContent);
    }
    if (nextSibling) {
        console.log("Next sibling content: " + nextSibling.textContent);
    }
});
