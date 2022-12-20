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
        {todo?.date && <span data-testid="date">{dateFormat(todo.date)}</span>}
        {todo?.date && <span data-testid="time">{timeFormat(todo.date)}</span>}
        <button className={`status ${todo.status}`}>{todo.status}</button>
    </div>
    )
}