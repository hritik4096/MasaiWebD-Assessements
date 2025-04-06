const todoListDiv = document.getElementById('todo-list');
const paginationDiv = document.getElementById('pagination');
const errorMessageDiv = document.getElementById('error-message');

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const todosPerPage = 10; // You can adjust this number
let currentPage = 1;
let totalTodos = 200; // The API doesn't provide a total count directly, so we'll use the known total

// Function to fetch todos for a specific page
async function fetchTodos(page) {
    try {
        errorMessageDiv.textContent = ''; // Clear any previous error messages
        const start = (page - 1) * todosPerPage;
        const apiUrlWithPagination = `${apiUrl}?_start=${start}&_limit=${todosPerPage}`;
        const response = await fetch(apiUrlWithPagination);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const todos = await response.json();
        currentPage = page;
        displayTodos(todos);
        renderPaginationButtons();

    } catch (error) {
        console.error('Error fetching todos:', error);
        errorMessageDiv.textContent = 'Failed to fetch todos. Please try again later.';
        todoListDiv.innerHTML = ''; // Clear any existing todos
        paginationDiv.innerHTML = ''; // Clear pagination buttons
    }
}

// Function to display the fetched todos in the DOM
function displayTodos(todos) {
    todoListDiv.innerHTML = ''; // Clear previous todos
    if (todos.length === 0) {
        todoListDiv.textContent = 'No todos found on this page.';
        return;
    }
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
            <span>${todo.title} (User ID: ${todo.userId})</span>
        `;
        todoListDiv.appendChild(todoItem);
    });
}

// Function to render the pagination buttons
function renderPaginationButtons() {
    paginationDiv.innerHTML = ''; // Clear previous buttons
    const totalPages = Math.ceil(totalTodos / todosPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            fetchTodos(i);
        });
        if (i === currentPage) {
            button.classList.add('active');
        }
        paginationDiv.appendChild(button);
    }
}

// Fetch initial todos on page load
fetchTodos(currentPage);