import React, { useState, useEffect } from "react";
import { firestore } from "./firebase-config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("not-started");

  const fetchTasks = async () => {
    const snapshot = await getDocs(collection(firestore, "tasks"));
    setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const addTask = async () => {
    if (taskName.trim() === "") return;
    await addDoc(collection(firestore, "tasks"), {
      name: taskName,
      category: taskCategory,
    });
    setTaskName("");
    fetchTasks(); // Re-fetch tasks after adding
  };

  const updateTask = async (id, newName) => {
    const taskDoc = doc(firestore, "tasks", id);
    await updateDoc(taskDoc, { name: newName });
    fetchTasks(); // Re-fetch tasks after updating
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(firestore, "tasks", id));
    fetchTasks(); // Re-fetch tasks after deleting
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  const taskCounts = {
    "not-started": tasks.filter(task => task.category === "not-started").length,
    ongoing: tasks.filter(task => task.category === "ongoing").length,
    completed: tasks.filter(task => task.category === "completed").length,
  };

  return (
    <div>
      <nav>
        <h3>Task Manager</h3>
        <div>
          <div className="task-card" onMouseEnter={() => console.log("Hovered over 'Not Started'")}>
            <h4>Not Started: {taskCounts["not-started"]}</h4>
            <ul>
              {tasks.filter(task => task.category === "not-started").map((task) => (
                <li key={task.id}>
                  {task.name}{" "}
                  <button onClick={() => updateTask(task.id, prompt("New task name:"))}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="task-card" onMouseEnter={() => console.log("Hovered over 'Ongoing'")}>
            <h4>Ongoing: {taskCounts["ongoing"]}</h4>
            <ul>
              {tasks.filter(task => task.category === "ongoing").map((task) => (
                <li key={task.id}>
                  {task.name}{" "}
                  <button onClick={() => updateTask(task.id, prompt("New task name:"))}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="task-card" onMouseEnter={() => console.log("Hovered over 'Completed'")}>
            <h4>Completed: {taskCounts["completed"]}</h4>
            <ul>
              {tasks.filter(task => task.category === "completed").map((task) => (
                <li key={task.id}>
                  {task.name}{" "}
                  <button onClick={() => updateTask(task.id, prompt("New task name:"))}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <select onChange={(e) => setTaskCategory(e.target.value)} value={taskCategory}>
          <option value="not-started">Not Started</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskManager;