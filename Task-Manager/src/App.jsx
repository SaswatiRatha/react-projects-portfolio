import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";
import TaskSummary from "./components/TaskSummary";

function App() {
  return (
    <div className="app-wrapper">
      <h1 className="main-heading">Task Manager</h1>
      <div className="task-body">
        <TaskInput />
        <div className="task-details">
          <TaskSummary />
          <TaskList />
        </div>
      </div>
    </div>
    
  );
}

export default App;