import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDes, setNewDes] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]); // Initialize as an empty array


  const handleAddToDo = () => {
    if (newTitle && newDes) {
      let newToDoItem = {
        title: newTitle,
        des: newDes
      };
      let updated = [...allTodos];
      updated.push(newToDoItem);
      setTodos(updated);
      setNewTitle('');
      setNewDes('');
      localStorage.setItem('todolist', JSON.stringify(updated));
    }
  };


  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // Only remove one item at the specified index
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleDeleteComplete = (index) =>
  {
    let reducedComplete = [...completedTodos];
    reducedComplete.splice(index,1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedComplete));
    setCompletedTodos(reducedComplete);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let hr = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yy + '/' + hr + ':' + min + ':' + sec;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if(savedCompletedTodos)
    {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);


  return (
    <div className="App">
      <h1>My Todo List</h1>
      <div className="todo-wrapper">
        <div className='todo-input-item'>
          <div>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's your task?" />
          </div>
        </div>
        <div className='todo-input-item'>
          <div>
            <label>Description</label>
            <input type="text" value={newDes} onChange={(e) => setNewDes(e.target.value)} placeholder="What's your description?" />
          </div>
        </div>
        <div className='todo-input-item'>
          <div>
            <button type="button" onClick={handleAddToDo} className="primaryBtn">ADD</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`isFullScreen ${isFullScreen === false && 'active'}`} onClick={() => setIsFullScreen(false)}>ToDo</button>
          <button className={`isFullScreen ${isFullScreen === true && 'active'}`} onClick={() => setIsFullScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {isFullScreen === false && allTodos.map((item, index) => {
            
            
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.des}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDelete(index)} title="delete" />
                  <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} title='complete?' />
                </div>
              </div>
            );
          })}

          {isFullScreen === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.des}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteComplete(index)} title="delete" />
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
