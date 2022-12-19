import {TodoStatus} from "@/common/enums/TodoStatus";

export type TodoModel = {
    title:string,
    description:string,
    date:Date,
    status:TodoStatus
}

