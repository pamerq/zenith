import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/TaskMenu.module.scss';

const TaskMenu: React.FC = () => {
	const location = useLocation();

	const getActiveClass = (path: string) => {
    	return location.pathname === path ? styles.active : '';
  	};

  	return (
  		<div className={styles.taskMenu}>
  			<h3>Task Menu</h3>
  			<ul>
  				<li>
  					<Link to="/tasks" className={`${styles.menuItem} ${getActiveClass('/tasks')}`}>
            			All Tasks
          			</Link>
  				</li>
  				<li>
  					<Link to="/tasks/completed" className={`${styles.menuItem} ${getActiveClass('/tasks/completed')}`}>
            			Completed Tasks
          			</Link>
  				</li>
  				<li>
  					<Link to="/tasks/pending" className={`${styles.menuItem} ${getActiveClass('/tasks/pending')}`}>
            			Pending Tasks
          			</Link>
  				</li>
  				<li>
  				</li>
  			</ul>
  		</div>
  	);
};

export default TaskMenu;
