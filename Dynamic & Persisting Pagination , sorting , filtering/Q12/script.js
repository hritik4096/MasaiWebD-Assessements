const galleryDiv = document.getElementById('gallery');
const loadingDiv = document.getElementById('loading');
const endOfContentDiv = document.getElementById('end-of-content');

const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
const initialLoadCount = 10;
const loadMoreCount = 10;
let currentPage = 1;
let isLoading = false;
let allImagesLoaded = false;

async function fetchImages(page, limit) {
    if (isLoading || allImagesLoaded) return;
    isLoading = true;
    loadingDiv.style.display = 'block';

    try {
        const response = await fetch(`${apiUrl}?_page=${page}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const images = await response.json();
        if (images.length < limit) {
            allImagesLoaded = true;
            endOfContentDiv.style.display = 'block';
        }
        displayImages(images);
        currentPage++;
    } catch (error) {
        console.error('Error fetching images:', error);
        const errorMessage = document.createElement('div');
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Failed to load images.';
        galleryDiv.appendChild(errorMessage);
    } finally {
        isLoading = false;
        loadingDiv.style.display = 'none';
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const imgElement = document.createElement('img');
        imgElement.src = image.thumbnailUrl; // Using thumbnailUrl for faster initial load
        imgElement.alt = image.title;
        imageContainer.appendChild(imgElement);
        galleryDiv.appendChild(imageContainer);
    });
}

function checkScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading && !allImagesLoaded) {
        fetchImages(currentPage, loadMoreCount);
    }
}

// Initial load
fetchImages(currentPage, initialLoadCount);

// Event listener for scroll
window.addEventListener('scroll', checkScroll);