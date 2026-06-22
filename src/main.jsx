import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import "./style.css";
function App() {
  return <h1>Task Manager</h1>;
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Header />
    <TaskList />
  </React.StrictMode>
);

