import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import TaskMenu from './TaskMenu';
import TaskForm from './TaskForm'; 
import styles from '../styles/Tasks.module.scss';
import axios from '../axiosConfig';

interface Task {
  _id: string;
  title: string;
  priority: string; 
  description: string;
  status: string; 
  createDate: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [statusesLoaded, setStatusesLoaded] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (taskData: { title: string; priority: string; description: string }) => {
    setTimeout(() => {
          closeModal();
        }, 1000);
  };

  useEffect(() => {

    const fetchStatuses = async () => {
      console.log("Status fetch");
      try {
        const response = await axios.get('/config/statuses');

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Unexpected response format");
        }

        const statusesMap = response.data.data.reduce((acc: Record<string, string>, status: { _id: string, name: string }) => {
          acc[status._id] = status.name;  
          return acc;
        }, {});
        console.log('statusesMap',statusesMap);
        setStatuses(statusesMap);
        setStatusesLoaded(true);
      } catch (error: any) {
        console.error('Error loading statuses:', error);
        setError(error.message || 'Error loading statuses.');
      }
    };

    const fetchTasks = async () => {

      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get('/tasks/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('status',statuses);
        console.log('task',response.data);

        const groupedTasks = response.data.reduce((acc: Record<string, Task[]>, task: Task) => {
        const statusName = statuses[task.status];
        if (statusName) {
          acc[statusName] = acc[statusName] || [];
          acc[statusName].push(task);
        }
        return acc;
        }, {});

        console.log("Grouped Tasks:", groupedTasks);
        setTasks(groupedTasks);

      } catch (error) {
        console.error('Error loading tasks:', error);
      }

    };

    if (!statusesLoaded) {
      fetchStatuses();  // Fetch statuses first
    } else {
      fetchTasks();  // Fetch tasks after statuses have been loaded
    }

  }, [statusesLoaded]);


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
         {Object.entries(statuses).map(([statusId, statusName]) => (
            <div key={statusId}>
              <h2>{statusName}</h2>
              {tasks[statusName] && tasks[statusName].length > 0 ? (tasks[statusName].map((task) => (
                  <div key={task._id}>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <span>Priority: {task.priority}</span>
                    <span>Status: {statuses[task.status]}</span>
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