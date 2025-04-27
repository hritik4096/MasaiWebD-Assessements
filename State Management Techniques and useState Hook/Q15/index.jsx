import React, { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleAddTask = () => {
    if (taskTitle.trim() === "") {
      alert("Task title cannot be empty!");
      return;
    }
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: taskPriority,
      completed: false,
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return sortTasksByPriority(updatedTasks);
    });
    setTaskTitle("");
    setTaskPriority("Medium");
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const sortTasksByPriority = (tasks) => {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Incomplete" && !task.completed);

    return matchesPriority && matchesStatus;
  });

  return (
    <div>
      <h1>Advanced Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <h2>Filter Tasks</h2>
        <select value={filterPriority} onChange={handlePriorityFilterChange}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={filterStatus} onChange={handleStatusFilterChange}>
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              backgroundColor: task.priority === "High" ? "#f8d7da" : "white",
            }}
          >
            {task.title} - {task.priority}
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;