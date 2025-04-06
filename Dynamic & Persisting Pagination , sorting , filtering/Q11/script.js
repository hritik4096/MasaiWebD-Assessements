const userListDiv = document.getElementById('user-list');
const sortSelect = document.getElementById('sort');
const errorMessageDiv = document.getElementById('error-message');

const apiUrl = 'https://jsonplaceholder.typicode.com/users';
let usersData = [];

// Function to fetch user data from the API
async function fetchUsers() {
    try {
        errorMessageDiv.textContent = '';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        usersData = await response.json();
        displayUsers(usersData);
    } catch (error) {
        console.error('Error fetching users:', error);
        errorMessageDiv.textContent = 'Failed to fetch user data. Please try again later.';
        userListDiv.innerHTML = '';
    }
}

// Function to display user data
function displayUsers(users) {
    userListDiv.innerHTML = '';
    if (users.length === 0) {
        userListDiv.textContent = 'No users to display.';
        return;
    }
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>ID: ${user.id}</p>
            `;
        userListDiv.appendChild(userCard);
    });
}

// Function to handle sorting based on query parameters
function sortUsers(sortBy) {
    if (!sortBy) {
        displayUsers(usersData); // Display original order
        return;
    }

    const sortedUsers = [...usersData].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return -1;
        }
        if (a[sortBy] > b[sortBy]) {
            return 1;
        }
        return 0;
    });

    displayUsers(sortedUsers);
}

// Event listener for the sort select dropdown
sortSelect.addEventListener('change', (event) => {
    const sortBy = event.target.value;
    // In a real application, you might update the URL with a query parameter
    // and then fetch/sort based on that. For this exercise, we'll sort
    // the already fetched data.
    sortUsers(sortBy);
});

// Fetch users when the page loads
fetchUsers();