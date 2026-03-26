import { useState } from "react";
import { API_URL } from "../config";

function List({ tasks, getTasks, token }) {
  const [loadingId, setLoadingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const deleteTask = async (id) => {
    setLoadingId(id);
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      getTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    } finally {
      setLoadingId(null);
    }
  };

  const toggleComplete = async (id) => {
    setTogglingId(id);
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      getTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task status");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-4">No tasks yet...</p>
      ) : (
        tasks.map((task) => (
          <div className={`flex justify-between items-center p-4 border rounded-lg shadow-sm font-medium transition ${task.completed ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-700'}`} key={task._id || task.id || Math.random()}>
            <div className={`flex flex-col items-start ${task.completed ? 'line-through' : ''}`}>
              <span>{task.text || task}</span>
              {task.dateTime && (
                <span className="text-xs font-normal opacity-70">
                  {new Date(task.dateTime).toLocaleString()}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleComplete(task._id)}
                disabled={togglingId === task._id}
                className={`px-3 py-1.5 min-w-[105px] text-sm font-semibold rounded-md transition-all flex items-center justify-center shadow-sm ${
                  task.completed 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {togglingId === task._id ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  task.completed ? "Incomplete" : "Completed"
                )}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                disabled={loadingId === task._id}
                className={`p-2 rounded-md transition text-white flex items-center justify-center ${loadingId === task._id ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                title="Delete task"
              >
                {loadingId === task._id ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default List;