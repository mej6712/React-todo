import React from "react";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <div className="todo-wrap">
        <div className="todo-inner">
          <div className="todo-header">
            <h1>All Tasks</h1>
          </div>
          <div className="todo-content">
            <Todo />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
