import { useTaskContext } from "../context/useTaskContext";

export default function TaskSummary() {
  const { tasks, clearTask, setSearchQuery, searchQuery, filter, setFilter } = useTaskContext();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="task-summary-wrapper">
      <div className="search-filter">
        <input
          className="input-bar"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h3 className="filter-heading">Filter:</h3>
      <div className="all-btns">
        <div className="filter-btns">
        <button className={filter === "All" ? "active" : ""} onClick={()=> setFilter("All")}>All</button>
        <button className={filter === "Pending" ? "active" : ""} onClick={()=> setFilter("Pending")}>Pending</button>
        <button className={filter === "Completed" ? "active" : ""} onClick={()=> setFilter("Completed")}>Completed</button>
      </div>
      <button className="clear-task" onClick={()=>clearTask()}>Clear Tasks</button>
      </div>
      <div className="task-summary">
        <div className="summary-card">
          <h3>Total: {totalTasks}</h3>
        </div>
        <div className="summary-card">
          <h3>Completed: {completedTasks}</h3>
        </div>
        <div className="summary-card">
          <h3>Pending: {pendingTasks}</h3>
        </div>
      </div>
    </div>
  );
}
