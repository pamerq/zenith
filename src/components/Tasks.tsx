import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import TaskMenu from './TaskMenu';
import TaskForm from './TaskForm'; 
import styles from '../styles/Tasks.module.scss';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = async (taskData: { title: string; priority: string; description: string }) => {
  const response = await axios.post('/tasks', taskData);
    try {
      // Aquí puedes hacer la solicitud para crear una tarea en tu backend
      //const response = await axios.post('/tasks', taskData);
      //setTasks([...tasks, response.data]); // Agregar la nueva tarea al estado

      closeModal(); 
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

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
           <button onClick={openModal} className={styles.createTaskButton}>Create New Task</button>
        </div>
        <ul>
          {tasks.map(task => (
            <li>Tarea</li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Task"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <TaskForm onSubmit={handleCreateTask} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default Tasks;