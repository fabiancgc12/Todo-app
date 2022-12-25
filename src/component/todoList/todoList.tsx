import React, {useState} from "react";
import {TodoItem} from "../todoItem/todoItem";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {Button, Container, Flex, Title} from "@mantine/core";
import {useTodosContext} from "@/global/todosContext/todosContext";
import {TodoModel} from "@/common/models/Todo.model";
import {useLocalStorage} from "@/common/hooks/useLocalStorage";
import {sortTodos} from "@/common/utils/sortTodos";
import {SearchInput} from "@/component/todoList/searchInput";
import {TbMoodEmpty} from "react-icons/all";

enum filterType{
    today,
    tomorrow,
    all
}

export function TodoList(){
    const [todos,setTodos] = useTodosContext();
    const [filter, setFilter] = useLocalStorage({
        key:"listFilter",
        defaultValue:filterType.today
    });
    const [filterTitle, setFilterTitle] = useState("");
    let todosWithDates:TodoModel[] = []
    const todosWithoutDate:TodoModel[] = [];
    const today = new Date();
    todos.forEach((t) => {
        if (t.date){
            if (filter === filterType.today && isTodayDate(today,t.date) && isTheTitleValid(t.title,filterTitle))
                todosWithDates.push(t)
            else if (filter === filterType.tomorrow && isTomorrowDate(today,t.date) && isTheTitleValid(t.title,filterTitle))
                todosWithDates.push(t)
            else if (filter === filterType.all && isTheTitleValid(t.title,filterTitle))
                todosWithDates.push(t)
        }
        else if (isTheTitleValid(t.title,filterTitle))
            todosWithoutDate.push(t)
    })
    if (filter === filterType.all)
        todosWithDates = sortTodos(todosWithDates)

    return (
        <Flex direction="column" px={"sm"} gap={10}>
            <SearchInput defaultValue={filterTitle} cb={newTitleFilter => setFilterTitle(newTitleFilter)}/>
            {filterTitle}
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
            <RenderTodos todos={todosWithDates} setTodos={setTodos}/>
            <Title>Without Date</Title>
            <RenderTodos todos={todosWithoutDate} setTodos={setTodos}/>
        </Flex>
    )
}

type RenderProps = {
    todos:TodoModel[],
    setTodos:React.Dispatch<React.SetStateAction<TodoModel[]>>
}

function RenderTodos({todos,setTodos}:RenderProps){
    if (todos.length === 0)
        return <Container><TbMoodEmpty/> Empty</Container>
    return (
        <div>
            {todos.map((t) => <TodoItem
                key={`todo-${t.id}`}
                todo={t}
                changeStatus={() => {
                    setTodos(todos => {
                        const newTodos = [...todos]
                        const newTodo = {...t}
                        const index = newTodos.findIndex(t => t.id === newTodo.id)
                        if (newTodo.status == TodoStatus.Completed)
                            newTodo.status = TodoStatus.unCompleted
                        else if (newTodo.status == TodoStatus.unCompleted)
                            newTodo.status = TodoStatus.Pending
                        else if (newTodo.status == TodoStatus.Pending)
                            newTodo.status = TodoStatus.Completed
                        newTodos.splice(index,1,newTodo)
                        return newTodos
                    })
                }}
            />)}
        </div>
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

function isTheTitleValid(title:string,filterTitle:string) {
    if (filterTitle === "") return true
    return title.includes(filterTitle)
}