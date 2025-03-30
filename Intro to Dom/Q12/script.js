// Select the <h1> element by its id and change its text content
document.getElementById('header').textContent = "Welcome to the DOM World!";

// Select all <p> elements and change their text color
const paragraphs = document.getElementsByTagName('p');
for (let p of paragraphs) {
    p.style.color = 'blue';
}

// Select the first <div> with class 'container' and change its background color
document.querySelector('.container').style.backgroundColor = 'yellow';

// Functionality for adding new list items
document.getElementById('add-item').addEventListener('click', function () {
    const ul = document.getElementById('item-list');
    const newItem = document.createElement('li');
    const count = ul.getElementsByTagName('li').length + 1;
    
    newItem.textContent = `New Item ${count}`;
    
    // Apply styles based on sequence number
    if (count % 2 !== 0) {
        newItem.classList.add('bold-blue');
    } else {
        newItem.classList.add('italic-red');
    }

    ul.appendChild(newItem);
});
