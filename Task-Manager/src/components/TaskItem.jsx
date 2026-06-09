import { useTaskContext } from "../context/useTaskContext";

export default function TaskItem({ task }) {
  const {
    toggleTask,
    editTask,
    editingTaskId,
    editedTask,
    handleSaveEdit,
    handleCancelEdit,
    deleteTask,
    handleEditChange,
  } = useTaskContext();

  return (
    <div className={`task-item ${task.completed ? "completed-task" : ""}`}>
      <div className="task-header">
        {editingTaskId !== task.id && 
        <div
          className={`task-radio ${task.completed ? "checked" : ""}`}
          onClick={() => toggleTask(task.id)}
        />}
        <div className="task-information">
          {editingTaskId === task.id ? (
            <div className="task-content">
              <input
                className="edit-title"
                type="text"
                value={editedTask.task}
                onChange={(e) => handleEditChange("task", e.target.value)}
              />
              <textarea
                className="edit-description"
                value={editedTask.description}
                onChange={(e) =>
                  handleEditChange("description", e.target.value)
                }
              />
            </div>
          ) : (
            <div className="task-content">
              <span
                className={`task-title ${task.completed ? "completed" : ""}`}
              >
                {task.task}
              </span>
              <p
                className={`task-description ${task.completed ? "completed" : ""}`}
              >
                {task.description}
              </p>
            </div>
          )}
          {editingTaskId === task.id ? (
            <select 
              className="edit-priority"
              value={editedTask.priority}
              onChange={(e) =>
                  handleEditChange("priority", e.target.value)
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <p className={`priority ${task.priority?.toLowerCase()}`}>
              {task.priority}
            </p>
          )}
        </div>
      </div>

      <div className="task-divider" />

      {editingTaskId === task.id ? (
        <div className="edit-btns">
          <button className="save-edit-btn" onClick={()=>handleSaveEdit(task.id)}>Save</button>
          <button className="cancel-edit-btn" onClick={()=>handleCancelEdit(task.id)}>cancel</button>
        </div>
      ) : (
        <>
        <p className="task-created">Created: {task.createdAt}</p>

      <div className="btns">
        <button
          className={`task-status ${task.completed ? "completed-task" : "pending-task"}`}
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Completed" : "Pending"}
        </button>

        <button className="edit-btn" onClick={() => editTask(task)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div></>
      )}
    </div>
  );
}
