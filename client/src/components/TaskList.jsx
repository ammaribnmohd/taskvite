import  { useContext, useEffect } from 'react';
import Task from './Task';
import { TaskContext } from '../context/TaskContext';
import axios from 'axios';

const TaskList = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, [setTasks]);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
