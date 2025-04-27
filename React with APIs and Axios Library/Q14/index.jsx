import React from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchData = () => {
    axios("https://your-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        const tasksData = response.data;
        const tasksArray = [];
        
        for (let key in tasksData) {
          tasksArray.push({
            id: key, 
            name: tasksData[key].name, 
          });
        }

        setTasks(tasksArray); 
      })
      .catch((error) => {
        setError("Error fetching tasks: " + error.message); // Error handling
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li> 
        ))}
      </ul>
    </div>
  );
}

export default TaskList;