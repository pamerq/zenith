  import React, { useEffect, useState } from 'react';
  import axios from '../axiosConfig';
  import { useParams } from 'react-router-dom';
  import { useLocation } from 'react-router-dom';
  import { Task } from '../types/Task';
  import { FaRegClock } from 'react-icons/fa';
  import ReactDatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import styles from '../styles/TaskDetail.module.scss';

  interface LocationState {
    statuses: Record<string, string>;
    priorities: Record<string, string>;
  }

  const TaskDetail: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>(); // Obtiene el taskId de la URL
    const [task, setTask] = useState<Task | null>(null);
    const location = useLocation();
    const { statuses = {}, priorities = {} } = location.state as LocationState || {};
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDeadline, setIsEditingDeadline] = useState(false); 

    useEffect(() => {
      console.log('Task ID:', taskId);
      const fetchTaskDetails = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await axios.get(`/tasks/${taskId}`, {
            headers: {
              Authorization: `Bearer ${token}`, 
          },
        });
          console.log('Fetched task data:', response.data);
          setTask(response.data); 
        } catch (error) {
          console.error('Error fetching task details:', error);
        }
      };

      fetchTaskDetails();
    }, [taskId]);

    if (!task) {
      return <p>Loading task details...</p>; 
    }
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask((prevTask) => {
        if (prevTask) {
          return { ...prevTask, title: e.target.value };
        }
        return prevTask;
      });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTask((prevTask) => {
        if (prevTask) {
          return { ...prevTask, status: e.target.value };
        }
        return prevTask;
      });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTask((prevTask) => {
        if (prevTask) {
          return { ...prevTask, description: e.target.value };
        }
        return prevTask;
      });
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTask((prevTask) => {
        if (prevTask) {
          return { ...prevTask, priority: e.target.value };
        }
        return prevTask;
      });
    };

    const handleDeadlineChange = (date: Date | null) => {
      setTask((prevTask: any) => ({ ...prevTask, deadline: date }));
    };

    const handleSave = async () => {
    if (!task) return;

    try {
      const token = localStorage.getItem('token');
      const updatedTask = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
      };

      const response = await axios.put(`/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Task updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
      <div className={styles.taskDetailContainer}>
        {task ? (
          <>
            <h1 className={styles.taskTitle}>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={handleTitleChange}
                  onBlur={() => setIsEditingTitle(false)} // Salir del modo de edición al hacer blur
                  autoFocus
                  className={styles.titleInput}
                />
              ) : (
                <span onClick={() => setIsEditingTitle(true)}>{task.title}</span>
              )}
            </h1>
            <div className={styles.taskInfoContainer}>
              <div className={styles.taskField}>
                <label className={styles.label}>Status:</label>
                <select 
                  className={styles.select} 
                  value={task.status} 
                  onChange={handleStatusChange}
                >
                  {Object.entries(statuses).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.taskField}>
                <label className={styles.label}>Priority:</label>
                <select 
                className={styles.select} 
                value={task.priority}
                onChange={handlePriorityChange}>
                  {Object.entries(priorities).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.taskField}>
                <label className={styles.label}>Description:</label>
                <textarea
                  className={styles.textarea}
                  value={task.description}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className={`${styles.rightAligned}`}>
                <label className={styles.label} htmlFor="deadline">Deadline:</label>
                {isEditingDeadline ? (
                  <ReactDatePicker
                    selected={task.deadline ? new Date(task.deadline) : null}
                    onChange={handleDeadlineChange}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    required
                    autoFocus
                  />
                ) : (
                  <span onClick={() => setIsEditingDeadline(true)}>
                    {task.deadline
                      ? new Date(task.deadline).toISOString().split('T')[0] // Formato 'yyyy-MM-dd'
                      : 'No deadline'}
                  </span>
                )}
                <div className={styles.clockIconWrapper}>
                  <FaRegClock className={styles.clockIcon} />
                </div>
              </div>

              <div className={styles.buttonsContainer}>
                <button className={styles.deleteButton}>Eliminar</button>
                <button onClick={handleSave} className={styles.saveButton}>Guardar</button>
              </div>

            </div>
          </>
        ) : (
          <p>No task found.</p>
        )}
      </div>
    );
  };

  export default TaskDetail;
