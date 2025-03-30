document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("userList");

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const listItem = document.createElement("li");
                listItem.textContent = user.name;
                listItem.addEventListener("click", () => {
                    alert(`Email: ${user.email}`);
                });
                userList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
});
