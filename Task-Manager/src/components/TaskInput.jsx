import { useState } from "react";
import { useTaskContext } from "../context/useTaskContext";

export default function TaskInput() {
  const {
    addTask,
  } = useTaskContext();


  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit() {
    if (!text.trim()) return;

    addTask(text, description, priority);

    setText("");
    setDescription("");
    setPriority("Medium");
  }

  return (
    <div className="task-input">

      <label htmlFor="task-title" className="input-label">
        Title
      </label>
      <input
        id="task-title"
        className="input-bar"
        value={text}
        placeholder="Add new task"
        onChange={(e) => setText(e.target.value)}
      />

      <label htmlFor="task-description" className="input-label">
        Description
      </label>
      <textarea
        id="task-description"
        className="input-bar"
        value={description}
        placeholder="Add task description"
        onChange={(e) =>setDescription(e.target.value)}
      />

      <label htmlFor="task-priority" className="input-label">
        Priority
      </label>
      <select
        id="task-priority"
        className="priority-select"
        value={priority}
        onChange={(e) =>setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>


      <button className="add-btn" onClick={handleSubmit}>
        Add Task
      </button>

    </div>
  );
}