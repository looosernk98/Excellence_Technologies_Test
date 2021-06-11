import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Users from "./components/Users"
function App() {
  return (
    <div className="app">
      <div className='todo-app'>
        <TodoList />
      </div>
     <div><h2 className="usertable">Users data Table</h2>
     <Users/>
     </div>
    </div>
  );
}

export default App;
