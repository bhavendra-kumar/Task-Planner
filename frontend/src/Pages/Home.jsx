import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import List from "../Components/List";

function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // fetch tasks
  const getTasks = async () => {
    if (!userInfo) return;
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      getTasks();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl outline-1 outline-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">📝 Task Planner</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 font-semibold rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>

      <Form getTasks={getTasks} token={userInfo?.token} />
      <List tasks={tasks} getTasks={getTasks} token={userInfo?.token} />
    </div>
  );
}

export default Home;