const userListDiv = document.getElementById('user-list');
const paginationButtonsDiv = document.getElementById('pagination-buttons');
const errorMessageDiv = document.getElementById('error-message');

const usersPerPage = 6;
let currentPage = 1;
let totalUsers = 0;

// Function to fetch user data from the API
async function fetchUsers(page) {
    try {
        errorMessageDiv.textContent = ''; // Clear any previous error messages
        const apiUrl = `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        const totalCountHeader = response.headers.get('X-Total-Count');
        totalUsers = totalCountHeader ? parseInt(totalCountHeader) : 0;
        currentPage = page;
        displayUsers(users);
        renderPaginationButtons();

    } catch (error) {
        console.error('Error fetching users:', error);
        errorMessageDiv.textContent = 'Failed to fetch user data. Please try again later.';
        userListDiv.innerHTML = ''; // Clear any existing users
        paginationButtonsDiv.innerHTML = ''; // Clear pagination buttons
    }
}

// Function to display user data
function displayUsers(users) {
    userListDiv.innerHTML = ''; // Clear previous user data
    if (users.length === 0) {
        userListDiv.textContent = 'No users found on this page.';
        return;
    }
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
        `;
        userListDiv.appendChild(userCard);
    });
}

// Function to render pagination buttons
function renderPaginationButtons() {
    paginationButtonsDiv.innerHTML = ''; // Clear previous buttons
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            fetchUsers(i);
        });
        if (i === currentPage) {
            button.classList.add('active');
        }
        paginationButtonsDiv.appendChild(button);
    }
}

// Fetch initial data on page load
fetchUsers(currentPage);