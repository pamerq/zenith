import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import TaskMenu from './TaskMenu';
import TaskForm from './TaskForm'; 
import styles from '../styles/Tasks.module.scss';
import axios from 'axios';

interface Task {
  _id:string;
  title: string;
  priority: string;
  description: string;
  status: string;
  createDate: Date;
}

const Tasks: React.FC = () => {

  //const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({ "Pending": [], "In Progress": [], "Completed": [],});
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const STATUS = ["Pending", "In Progress", "Completed"];


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = async (taskData: { title: string; priority: string; description: string }) => {
  //const response = await axios.post('/tasks', taskData);
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

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;
  axios
    .get('http://localhost:5001/api/tasks/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //console.log('Response data:', response.data);
      // Si response.data.tasks es el array real
      //setTasks(Array.isArray(response.data) ? response.data : []);

      const groupedTasks = response.data.reduce((acc: Record<string, Task[]>, task: Task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
      }, {} as Record<string, Task[]>);

      const initializedColumns = STATUS.reduce((acc: Record<string, Task[]>, column) => {
        acc[column] = groupedTasks[column] || []; 
        return acc;
      }, {} as Record<string, Task[]>);

      setTasks(initializedColumns);

    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);


  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.tasksContainer}>
      <TaskMenu />

      <div className={styles.tasksContent}>
        <div className={styles.header}>
          <h1>Tasks</h1>
           <button onClick={openModal} className={styles.createTaskButton}>Create New Task</button>
        </div>
        <div>
          {STATUS.map((status) => (
            <div key={status}>
              <h2>{status}</h2>
              {tasks[status].length > 0 ? (tasks[status].map((task) => (
                  <div key={task._id}>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <span>Priority: {task.priority}</span>
                    <small>Created: {new Date(task.createDate).toLocaleDateString()}</small>
                  </div>
              ))) : (
              <p> No tasks available</p>
              )}
            </div>
          ))}
        </div>
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