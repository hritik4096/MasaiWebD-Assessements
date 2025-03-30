const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = { id: Date.now(), text: taskText, completed: false };
        tasks.push(newTask);
        taskInput.value = "";
        updateLocalStorage();
        renderTasks();
    }
});

taskList.addEventListener("click", (e) => {
    const taskId = e.target.closest("li")?.dataset.id;
    if (!taskId) return;

    if (e.target.classList.contains("delete")) {
        tasks = tasks.filter(task => task.id !== Number(taskId));
    } else if (e.target.classList.contains("toggle")) {
        const task = tasks.find(task => task.id === Number(taskId));
        if (task) task.completed = !task.completed;
    }

    updateLocalStorage();
    renderTasks();
});

searchTask.addEventListener("input", () => {
    renderTasks(searchTask.value.toLowerCase());
});

function renderTasks(filter = "") {
    taskList.innerHTML = "";
    tasks
        .filter(task => task.text.toLowerCase().includes(filter))
        .forEach(task => {
            const li = document.createElement("li");
            li.dataset.id = task.id;
            li.classList.toggle("completed", task.completed);

            li.innerHTML = `
                <input type="checkbox" class="toggle" ${task.completed ? "checked" : ""}>
                ${task.text}
                <button class="delete">Delete</button>
            `;

            taskList.appendChild(li);
        });
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
