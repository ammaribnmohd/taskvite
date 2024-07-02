import  { useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { TaskContext } from '../context/TaskContext';
import axios from 'axios';

const TaskForm = ({ task, setEditing }) => {
  const { setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [completed, setCompleted] = useState(task ? task.completed : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      axios.put(`/api/tasks/${task._id}`, { title, description, completed })
        .then(response => setTasks(prev => prev.map(t => t._id === response.data._id ? response.data : t)))
        .catch(error => console.error(error));
    } else {
      axios.post('/api/tasks', { title, description, completed })
        .then(response => setTasks(prev => [...prev, response.data]))
        .catch(error => console.error(error));
    }
    setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
      <label>
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        Completed
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

// Define prop types for TaskForm
TaskForm.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
  setEditing: PropTypes.func.isRequired,
};

export default TaskForm;
