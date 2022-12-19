import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";

type props = {
    todo:TodoModel
}

export function TodoItem({todo}:props){
    return (
    <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <span>{dateFormat(todo.date)}</span>
        <span>{timeFormat(todo.date)}</span>
        <span>{todo.status}</span>
    </div>
    )
}