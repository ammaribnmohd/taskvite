import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TaskForm from './TaskForm';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

const Task = ({ task }) => {
  const [editing, setEditing] = React.useState(false);
  const { setTasks } = useContext(TaskContext); // Use the context

  const handleDelete = () => {
    axios.delete(`/api/tasks/${task._id}`)
      .then(() => setTasks(prev => prev.filter(t => t._id !== task._id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="task">
      {editing ? (
        <TaskForm task={task} setEditing={setEditing} />
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                axios.put(`/api/tasks/${task._id}`, { ...task, completed: !task.completed })
                  .then(response => setTasks(prev => prev.map(t => t._id === response.data._id ? response.data : t)))
                  .catch(error => console.error(error));
              }}
            />
            Completed
          </label>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Task;
