import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Task1 from "./components/Task1/Task1";
import Task2 from "./components/Task2/Task2";
const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Chọn Task để thực hiện</h1>
        <nav>
          <Link to="/task1">
            <button>Task 1</button>
          </Link>
          <Link to="/task2">
            <button>Task 2</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/task1" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
          <Route path="/" element={<h2>Đỗ Tấn Hoàng Phi - FE Intern</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
