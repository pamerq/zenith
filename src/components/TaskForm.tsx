import React, { useState } from 'react';
import styles from '../styles/TaskForm.module.scss';

interface TaskFormProps {
  onSubmit: (taskData: { summary: string; priority: string; description: string }) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
	const [summary, setSummary] = useState('');
  	const [priority, setPriority] = useState('Low');
  	const [description, setDescription] = useState('');

  	const handleSubmit = (e: React.FormEvent) => {
    	e.preventDefault();
    	onSubmit({ summary, priority, description });
  	};
  	return (
  		<form onSubmit={handleSubmit} className={styles.taskForm}>
      		<div>
        		<label htmlFor="summary">Summary</label>
		        <input
		          type="text"
		          id="summary"
		          value={summary}
		          onChange={(e) => setSummary(e.target.value)}
		          required
		        />
      		</div>
      		<div>
        		<label htmlFor="priority">Priority</label>
        		<select
          			id="priority"
          			value={priority}
          			onChange={(e) => setPriority(e.target.value)}>
          			<option value="Low">Low</option>
          			<option value="Medium">Medium</option>
          			<option value="High">High</option>
        		</select>
      		</div>
      		<div>
        		<label htmlFor="description">Description</label>
        		<textarea
          			id="description"
          			value={description}
          			onChange={(e) => setDescription(e.target.value)}
          			required
        		/>
      		</div>
      		<div className={styles.buttonContainer}>
        		<button type="submit">Create</button>
        		<button type="button" onClick={onCancel}>Cancel</button>
      		</div>
    	</form>
  	);
};

export default TaskForm;