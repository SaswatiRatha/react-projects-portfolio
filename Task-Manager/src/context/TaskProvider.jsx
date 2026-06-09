import { useReducer } from "react";
import { TaskContext } from "./TaskContext";

const initialState = {
  tasks: [],
  editingTaskId: null,
  editedTask: {},
  searchQuery: "",
  filter: "All"
};

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            task: action.payload.text,
            description: action.payload.description,
            priority: action.payload.priority,
            completed: false,
            createdAt: new Date().toLocaleDateString(),
          },
        ],
        editingTaskId: null,
        editedTask: {},
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case "START_EDIT":
      return {
        ...state,
        editingTaskId: action.payload.id,
        editedTask: state.tasks.find((task)=>
          task.id === action.payload.id 
        )
      }

    case "UPDATE_TASK":
      return {
        ...state,
        editedTask: {
          ...state.editedTask,
            [action.payload.field]: action.payload.value,
        },
      }

    case "SAVE_EDIT":
      return {
        ...state,
        tasks: state.tasks.map((task)=>
          task.id === action.payload ? 
          {...task, ...state.editedTask} : task
        ),
        editingTaskId: null,
        editedTask: {}
        
      }

    case "CANCEL_EDIT":
      return {
        ...state,
        editingTaskId: null,
        editedTask: {}
      }
    
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "CLEAR_ALL":
      return {
        ...state,
        tasks: [],
      };

    case "SET_SEARCH":
      return{
        ...state,
        searchQuery: action.payload,
      }

    case "SET_FILTER":
      return{
        ...state,
        filter: action.payload,
      }

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  function addTask(text, description, priority) {
    dispatch({
      type: "ADD_TASK",
      payload: { text, description, priority },
    });
  }

  function toggleTask(id) {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
  }

  function editTask(task) {
    dispatch({
      type: "START_EDIT",
      payload: task,
    });
    console.log(state.editedTask);
  }

  function handleEditChange(field,value){
    dispatch({
      type: "UPDATE_TASK",
      payload: {field, value}
    })
  }

  function handleSaveEdit(id){
    dispatch({
      type: "SAVE_EDIT",
      payload: id
    })
  }

  function handleCancelEdit(id){
    dispatch({
      type: "CANCEL_EDIT",
      payload: id
    })
  }

  function deleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  function setSearchQuery(value){
    dispatch({
      type: "SET_SEARCH",
      payload: value,
    })
  }

  function setFilter(value){
    dispatch({
      type: "SET_FILTER",
      payload: value,
    })
  }

  function clearTask() {
    dispatch({
      type: "CLEAR_ALL",
    });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        draftTask: state.draftTask,
        editingTaskId: state.editingTaskId,
        searchQuery: state.searchQuery,
        filter: state.filter,
        editedTask: state.editedTask,
        addTask,
        toggleTask,
        editTask,
        handleEditChange,
        handleSaveEdit,
        handleCancelEdit,
        deleteTask,
        clearTask,
        setSearchQuery,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}