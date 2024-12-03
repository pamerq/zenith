import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../../types/Task";
import { FaRegClock } from 'react-icons/fa';
import { calculateDaysLeft } from '../../helpers/utils';
import styles from '../../styles/KanbanView.module.scss';

interface KanbanViewProps {
  tasks: { [key: string]: Task[] };  
  statuses: { [key: string]: string }; 
  priorities: { [key: string]: string }; 
}

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, statuses, priorities}) => {
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuToggle = (taskId: string) => {
    setMenuVisible(menuVisible === taskId ? null : taskId);
  };

  const handleEdit = (taskId: string) => {
    navigate(`/tasks/${taskId}`, {
      state: {
        statuses,
        priorities
      }
    });
    setMenuVisible(null); 
  };

  const handleDelete = (taskId: string) => {
    console.log("Delete task with ID:", taskId);
    setMenuVisible(null); // Ocultar el menú después de eliminar
  };

  return (
    <div className={styles.kanbanBoard}>
         {Object.entries(statuses).map(([statusId, statusName]) => (
            <div key={statusId} className={styles.column}>
              <div className={styles.columnHeader}>{statusName}</div>
              <div className={styles.tasksContainer}>
                {tasks[statusName] && tasks[statusName].length > 0 ? (tasks[statusName].map((task) => (
                    <div key={task._id} className={styles.taskCard}>
                      <div className={styles.taskHead}> 
                        <div className={`${styles.priorityBox} ${styles[priorities[task.priority]]}`}>
                         {priorities[task.priority]}
                        </div>
                        <span className={styles.icon} onClick={() => handleMenuToggle(task._id)}> 
                          &#x2022;&#x2022;&#x2022; 
                        </span>
                      </div>
                      <div className={`${styles.menu} ${menuVisible === task._id ? styles.show : ''}`}>
                        <div className={styles.menuItem} onClick={() => handleEdit(task._id)}>
                          Edit
                        </div>
                        <div className={styles.menuItem} onClick={() => handleDelete(task._id)}>
                          Delete
                        </div>
                      </div>
                      <strong className={styles.taskCardTitle}>{task.title}</strong>
                      <div className={styles.deadlineContainer}>
                        <FaRegClock className={styles.clockIcon} />
                        <small className={styles.deadlineText}>
                          {calculateDaysLeft(new Date(), new Date(task.deadline))}d
                        </small>
                      </div>
                    </div>
                ))) : (
                <p className={styles.noTasks}> No tasks available</p>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default KanbanView;