import React, { useState, useEffect } from 'react';
import ReactDatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 
import styles from '../styles/TaskForm.module.scss';
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  onSubmit: (taskData: { title: string; priority: string; description: string; deadline: Date;}) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
	const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priorities, setPriorities] = useState<any[]>([]);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPriorities = async () => {
      try {
        const response = await axios.get('/config/priorities');
        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Unexpected response format");
        }
        setPriorities(response.data.data); 
        setPriority(response.data.data[0]._id); 
        
      } catch (err) {
        console.error('Error fetching priorities:', error);
      }
    };

    fetchPriorities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null);

    if (title.trim() === '' || description.trim() === '') {
      setError('Title and description are required.');
      return;
    }

    if (!deadline) {
      setError('Deadline is required.');
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
        { title, priority, description, deadline}, 
        { headers: {'Authorization': `Bearer ${token}`} }
      );

    	if (response.status === 201) {
    		setSuccess('Task created successfully!');
        onSubmit({ title, priority, description, deadline});
        setTimeout(() => {
          setSuccess(null); 
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
        {priorities.length > 0 ? (priorities.map((priority) => (
          <option key={priority._id} value={priority._id}> {priority.name} {/* Aquí usamos el nombre de la prioridad */}
          </option>
              ))
            ) : (
          <option disabled>Loading priorities...</option>
        )}
      </select>
    </div>
    <div>
      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
    </div>
    <div>
        <label htmlFor="deadline">Deadline</label>
        <ReactDatePicker 
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()} 
            placeholderText="Select deadline"
            required
        />
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