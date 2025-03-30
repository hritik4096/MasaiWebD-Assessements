function eventHandler(event) {
    alert("Clicked on: " + this.id);
    console.log("Event triggered on: " + this.id);
}

// Selecting elements
const outerDiv = document.getElementById("outer");
const middleDiv = document.getElementById("middle");
const innerDiv = document.getElementById("inner");
const buttons = document.querySelectorAll(".btn");

// Adding event listeners in both bubbling and capturing phases
outerDiv.addEventListener("click", eventHandler, true); // Capturing
middleDiv.addEventListener("click", eventHandler, true);
innerDiv.addEventListener("click", eventHandler, true);

outerDiv.addEventListener("click", eventHandler, false); // Bubbling
middleDiv.addEventListener("click", eventHandler, false);
innerDiv.addEventListener("click", eventHandler, false);

// Adding event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", eventHandler);
});

// Stop propagation for the innermost button
document.getElementById("stopPropagationBtn").addEventListener("click", function(event) {
    alert("Clicked Inner Button - Stopping Propagation");
    event.stopPropagation();
});
