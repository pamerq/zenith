import React, { useState } from 'react';
import axios from '../axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskForm.module.scss';

interface TaskFormProps {
  onSubmit: (taskData: { title: string; priority: string; description: string }) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
	const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null);

    if (title.trim() === '' || description.trim() === '') {
      setError('Title and description are required.');
      return;
    }

    setIsSubmitting(true);

    try {
    	const token = localStorage.getItem('token'); 
    	
    	if (!token) {
        setError('No token found, please log in again.');
        return;
      }

    	const response = await axios.post('/tasks/create', 
        { title, priority, description }, 
        { headers: {'Authorization': `Bearer ${token}`} }
      );

    	if (response.status === 201) {
    		setSuccess('Task created successfully!');
        onSubmit({ title, priority, description });
        setTimeout(() => {
          navigate('/tasks'); 	
        }, 2000);
      } else {
        setError('Failed to create task. Please try again.');
      }

    } catch (err: any) {
    	setError(err.response?.data?.message || 'An unexpected error occurred.');
    	console.error('Error creating task:', err.response || err);
    } finally {
    	setIsSubmitting(false); 
    }

};

return (
	<div>
  <form onSubmit={handleSubmit} className={styles.taskForm}>
  	<h2>Create Task</h2>
    <div>
    	<label htmlFor="title">Title</label>
		  <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
    </div>
    <div>
      <label htmlFor="priority">Priority</label>
      <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <div>
      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
    </div>
    <div className={styles.buttonContainer}>
    	<button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  </form>
  {error && <p className={styles.error}>{error}</p>}
	{success && <p className={styles.success}>{success}</p>}
	</div>
);
};

export default TaskForm;