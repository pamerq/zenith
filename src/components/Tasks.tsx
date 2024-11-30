import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';
import TaskMenu from './TaskMenu';
import TaskForm from './TaskForm'; 
import styles from '../styles/Tasks.module.scss';
import axios from '../axiosConfig';
import KanbanView from "./TaskViews/KanbanView";
import { Task } from "../types/Task";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [statusesLoaded, setStatusesLoaded] = useState(false);
  const [priorities, setPriorities] = useState<Record<string, string>>({});
  const [prioritiesLoaded, setPrioritiesLoaded] = useState(false);
  const [activeView, setActiveView] = useState("list");

  const renderActiveView = () => {
    switch (activeView) {
      case "Kanban":
        return <KanbanView tasks={tasks} statuses={statuses} priorities={priorities}/>;
      default:
        return <KanbanView tasks={tasks} statuses={statuses} priorities={priorities}/>;
    }
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (taskData: { title: string; priority: string; description: string }) => {
    setTimeout(() => {
          closeModal();
        }, 900);
  };

  useEffect(() => {

    const fetchPriorities = async () => {
      try {
        const response = await axios.get('/config/priorities');
        if (!response || !Array.isArray(response.data)) {
          throw new Error("Unexpected response format");
        }
        const prioritiesMap = response.data.reduce((acc: Record<string, string>, priority: { _id: string, name: string }) => {
          acc[priority._id] = priority.name;  
          return acc;
        }, {});
        setPriorities(prioritiesMap);
        setPrioritiesLoaded(true);
      } catch (error: any) {
        console.error('Error fetching priorities:', error);
      }
    };

    const fetchStatuses = async () => {

      try {
        const response = await axios.get('/config/statuses');

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Unexpected response format");
        }

        const statusesMap = response.data.data.reduce((acc: Record<string, string>, status: { _id: string, name: string }) => {
          acc[status._id] = status.name;  
          return acc;
        }, {});

        setStatuses(statusesMap);
        setStatusesLoaded(true);

      } catch (error: any) {

        console.error('Error loading statuses:', error);

      }
    };

    const fetchTasks = async () => {

      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get('/tasks/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const groupedTasks = response.data.reduce((acc: Record<string, Task[]>, task: Task) => {
        const statusName = statuses[task.status];
        if (statusName) {
          acc[statusName] = acc[statusName] || [];
          acc[statusName].push(task);
        }
        return acc;
        }, {});

        setTasks(groupedTasks);

      } catch (error) {
        console.error('Error loading tasks:', error);
      }

    };

    if (!statusesLoaded && !prioritiesLoaded) {
      fetchStatuses();  
      fetchPriorities();
    } else {
      fetchTasks();  // Fetch tasks after statuses have been loaded
    }

  }, [statusesLoaded, prioritiesLoaded, statuses, priorities]);


  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.tasksContainer}>
      <TaskMenu />
      <div className={styles.tasksContent}>
        <div className={`${styles.header} ${styles.buttonGroup}`}>
          <div className={styles.viewButtons}>
            <button onClick={() => setActiveView("Kanban")} className={styles.horizontalMenuButton}>Kanban View</button>
          </div>
          <button onClick={openModal} className={styles.horizontalMenuButton}>New Task +</button>
        </div>
        <div>
          {renderActiveView()} {/* Renderiza la vista activa */}
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