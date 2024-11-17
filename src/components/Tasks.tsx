import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import TaskMenu from './TaskMenu'; // Importar TaskMenu
import styles from '../styles/Tasks.module.scss';
import { Link } from 'react-router-dom'; 

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);

  /*useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchTasks();
  }, []);

  if (error) return <div>Error: {error}</div>;*/

  return (
    <div className={styles.tasksContainer}>
      <TaskMenu />

      <div className={styles.tasksContent}>
        <div className={styles.header}>
          <h1>Tasks</h1>
          <Link to="/tasks/create" className={styles.createTaskButton}>Create New Task</Link>
        </div>
        <ul>
          {tasks.map(task => (
            <li>Tarea</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
