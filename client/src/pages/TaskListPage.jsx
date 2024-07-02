
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskListPage = () => {
  return (
    <div>
      <h1>Task List</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskListPage;
