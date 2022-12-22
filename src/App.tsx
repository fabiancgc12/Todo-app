import React, { useState } from 'react'
import {TodoItem} from "./component/todoItem/todoItem";
import {TodoStatus} from "@/common/enums/TodoStatus";

const todo = {
    title:"this is a title",
    description:"testeando todo",
    date: new Date(2022,11,19,4,50),
    status:TodoStatus.Completed
}


function App() {
  const [todo, setTodo] = useState({
      title:"this is a titlenecfklnwelcf nweb cfvkbwriob viobw vioeobvo ie bvioeiveibiorv",
      description:"testeando todo",
      date: new Date(2022,11,19,4,50),
      status:TodoStatus.Completed
  })

  return (
    <div className="App">
      <TodoItem
        todo={todo}
        changeStatus={() => {
            const newTodo = {...todo}
            if (newTodo.status == TodoStatus.Completed)
                newTodo.status = TodoStatus.unCompleted
            else if (newTodo.status == TodoStatus.unCompleted)
                newTodo.status = TodoStatus.Pending
            else if (newTodo.status == TodoStatus.Pending)
                newTodo.status = TodoStatus.Completed
            setTodo(newTodo)
        }}/>
    </div>
  )
}

export default App
