const deleteUser = (key) => {
    // Corrected URL: Use template literals to insert the key dynamically
    fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, {
        method: 'DELETE',
    })
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // No need to parse JSON for DELETE, but check the response.
        return response;
    })
    .then(() => {
        console.log("User deleted successfully");
        // Remove the user from the table
        removeUserFromTable(key); // Call a function to update the table
    })
    .catch(error => console.error("Error deleting user:", error));
};

function removeUserFromTable(key) {
    const userRow = document.querySelector(`tr[data-key="${key}"]`);
    if (userRow) {
        userRow.remove();
    }
}

// Example usage (assuming you have a table with users and delete buttons):
// ... (Your existing code to fetch and display users)

function displayUsers(users) {
    userTableBody.innerHTML = "";
    for (const userId in users) {
        if (users.hasOwnProperty(userId)) {
            const user = users[userId];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button class="delete-button" data-key="${userId}">Delete</button></td>
            `;
            // Add a data-key attribute to the row for easier removal
            row.setAttribute("data-key", userId);
            userTableBody.appendChild(row);
        }
    }
    // Add event listeners to delete buttons
    addDeleteEventListeners();
}

function addDeleteEventListeners() {
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.dataset.key;
            deleteUser(userId);
        });
    });
}

// ... (Rest of your code to fetch users and display them)