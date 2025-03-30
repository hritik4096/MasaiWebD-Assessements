// Select the <h1> element by its id and change its text content
document.getElementById('header').textContent = "Welcome to the DOM World!";

// Select all <p> elements and change their text color
const paragraphs = document.getElementsByTagName('p');
for (let p of paragraphs) {
    p.style.color = 'blue';
}

// Select the first <div> with class 'container' and change its background color
document.querySelector('.container').style.backgroundColor = 'yellow';
