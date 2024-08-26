import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
