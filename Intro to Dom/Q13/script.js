// Change background color functionality
document.getElementById('change-bg').addEventListener('click', function () {
    const colorInput = document.getElementById('color-input').value.trim();
    const targetDiv = document.getElementById('target-div');

    targetDiv.style.backgroundColor = colorInput;

    if (!isValidColor(colorInput)) {
        alert('Invalid color name!');
        targetDiv.style.backgroundColor = ''; // Reset to default if invalid
    }
});

// Update text functionality
document.getElementById('update-text').addEventListener('click', function () {
    const textInput = document.getElementById('text-input').value.trim();
    const targetDiv = document.getElementById('target-div');

    if (textInput === '') {
        alert('Please enter some text!');
    } else {
        targetDiv.textContent = textInput;
    }
});

// Function to check if a given color is valid
function isValidColor(color) {
    const option = new Option().style;
    option.color = color;
    return option.color !== '';
}
