import React from "react";
import { Task } from "../../types/Task";
import styles from '../../styles/KanbanView.module.scss';

interface KanbanViewProps {
  tasks: { [key: string]: Task[] };  
  statuses: { [key: string]: string }; 
}

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, statuses }) => {
  return (
    <div className={styles.kanbanBoard}>
         {Object.entries(statuses).map(([statusId, statusName]) => (
            <div key={statusId} className={styles.column}>
              <div className={styles.columnHeader}>{statusName}</div>
              <div className={styles.tasksContainer}>
                {tasks[statusName] && tasks[statusName].length > 0 ? (tasks[statusName].map((task) => (
                    <div key={task._id} className={styles.taskCard}>
                      <strong>{task.title}</strong>
                      <p>{task.description}</p>
                      <span>Priority: {task.priority}</span>
                      <span>Status: {statuses[task.status]}</span>
                      <small>Created: {new Date(task.createDate).toLocaleDateString()}</small>
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