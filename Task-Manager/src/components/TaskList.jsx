import { useTaskContext } from "../context/useTaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, searchQuery, filter } = useTaskContext();
  const query = searchQuery.toLowerCase();



  const searchedTasks = query 
  ? tasks.filter((task) =>
    task.task.toLowerCase().includes(query) ||
    (task.description || "").toLowerCase().includes(query)
  )
  : tasks;

  const filteredTasks = searchedTasks.filter((task)=>{
    if(filter === "Completed") return task.completed;
    if(filter === "Pending") return !task.completed;
    return true;
  })

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

