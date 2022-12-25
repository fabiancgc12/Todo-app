import React, {useState} from "react";
import {TodoItem} from "../todoItem/todoItem";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {Button, Flex, Title} from "@mantine/core";
import {useTodosContext} from "@/global/todosContext/todosContext";
import {TodoModel} from "@/common/models/Todo.model";

enum filterType{
    today,
    tomorrow,
    all
}

export function TodoList(){
    const [todos,setTodos] = useTodosContext();
    const [filter, setFilter] = useState(filterType.today);
    const todosWithDates:TodoModel[] = []
    const todosWithoutDate:TodoModel[] = [];
    const today = new Date();
    todos.forEach((t) => {
        if (t.date){
            if (filter === filterType.today && isTodayDate(today,t.date))
                todosWithDates.push(t)
            else if (filter === filterType.tomorrow && isTomorrowDate(today,t.date))
                todosWithDates.push(t)
            else if (filter === filterType.all)
                todosWithDates.push(t)
        }
        else
            todosWithoutDate.push(t)
    })
    console.log(filter)
    return (
        <Flex direction="column" px={"sm"}>
            <Button.Group>
                <Button
                    onClick={() => {
                        setFilter(filterType.today)
                    }}
                    color={filter === filterType.today ? "default" : "gray"}
                >Today</Button>
                <Button
                    onClick={() => {
                        setFilter(filterType.tomorrow)
                    }}
                    color={filter === filterType.tomorrow ? "default" : "gray"}
                >Tomorrow</Button>
                <Button
                    onClick={() => {
                        setFilter(filterType.all)
                    }}
                    color={filter === filterType.all ? "default" : "gray"}
                >All</Button>
            </Button.Group>
            <div>
                {todosWithDates.map((t,index) => <TodoItem
                    key={`todo-${t.id}`}
                    todo={t}
                    changeStatus={() => {
                        const newTodos = [...todos]
                        const newTodo = {...t}
                        if (newTodo.status == TodoStatus.Completed)
                            newTodo.status = TodoStatus.unCompleted
                        else if (newTodo.status == TodoStatus.unCompleted)
                            newTodo.status = TodoStatus.Pending
                        else if (newTodo.status == TodoStatus.Pending)
                            newTodo.status = TodoStatus.Completed
                        newTodos.splice(index,1,newTodo)
                        setTodos(newTodos)
                    }}
                />)}
            </div>
            <Title>Without Date</Title>
            <div>
                {todosWithoutDate.map((t,index) => <TodoItem
                    key={`todo-${t.id}`}
                    todo={t}
                    changeStatus={() => {
                        const newTodos = [...todos]
                        const newTodo = {...t}
                        if (newTodo.status == TodoStatus.Completed)
                            newTodo.status = TodoStatus.unCompleted
                        else if (newTodo.status == TodoStatus.unCompleted)
                            newTodo.status = TodoStatus.Pending
                        else if (newTodo.status == TodoStatus.Pending)
                            newTodo.status = TodoStatus.Completed
                        newTodos.splice(index,1,newTodo)
                        setTodos(newTodos)
                    }}
                />)}
            </div>
        </Flex>
    )
}

function isTodayDate(today:Date,date:Date){
    return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
}

function isTomorrowDate(today:Date,date:Date){
    const tomorrow = new Date(today.getTime())
    tomorrow.setDate(tomorrow.getDate() + 1)
    return date.toDateString() === tomorrow.toDateString()
}

