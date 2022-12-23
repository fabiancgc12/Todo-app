import React from 'react'
import {TodoForm} from "./component/todoForm/todoForm";

function App() {
    return (
    <div className="App">
        <TodoForm action={(todo) => {
        console.log(todo)}
        }/>
    </div>
  )
}

export default App
