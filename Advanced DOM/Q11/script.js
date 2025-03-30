document.getElementById("addBtn").addEventListener("click", function () {
    const para = document.createElement("p");
    para.textContent = "This is a new paragraph.";
    document.getElementById("paragraphContainer").appendChild(para);
});

document.getElementById("removeBtn").addEventListener("click", function () {
    const container = document.getElementById("paragraphContainer");
    if (container.lastChild) {
        container.removeChild(container.lastChild);
    }
});
