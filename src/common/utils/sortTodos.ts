import {TodoModel} from "@/common/models/Todo.model";

export function sortTodos(todos:TodoModel[]){
    todos.sort((a,b) => {
        if (a.date && b.date)
            return a.date.getTime() - b.date.getTime()
        return -1
    })
    return todos
}