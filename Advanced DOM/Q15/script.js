const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasksCount = document.getElementById("totalTasks");
const completedTasksCount = document.getElementById("completedTasks");
const incompleteTasksCount = document.getElementById("incompleteTasks");

const showAllBtn = document.getElementById("showAll");
const showCompletedBtn = document.getElementById("showCompleted");
const showIncompleteBtn = document.getElementById("showIncomplete");
const sortTasksBtn = document.getElementById("sortTasks");

let tasks = [];

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
    }
});

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const index = e.target.parentElement.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
    }

    if (e.target.classList.contains("toggle")) {
        const index = e.target.parentElement.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }
});

showAllBtn.addEventListener("click", () => renderTasks());
showCompletedBtn.addEventListener("click", () => renderTasks("completed"));
showIncompleteBtn.addEventListener("click", () => renderTasks("incomplete"));
sortTasksBtn.addEventListener("click", () => {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    renderTasks();
});

function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.dataset.index = index;
        li.classList.toggle("completed", task.completed);

        li.innerHTML = `
            <input type="checkbox" class="toggle" ${task.completed ? "checked" : ""}>
            ${task.text}
            <button class="delete">Delete</button>
        `;

        taskList.appendChild(li);
    });

    updateCounters();
}

function updateCounters() {
    totalTasksCount.textContent = tasks.length;
    completedTasksCount.textContent = tasks.filter(task => task.completed).length;
    incompleteTasksCount.textContent = tasks.filter(task => !task.completed).length;
}

renderTasks();
