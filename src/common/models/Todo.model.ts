import {TodoStatus} from "@/common/enums/TodoStatus";

export class TodoModel {
    id:string;
    title:string;
    description:string;
    date?:Date;
    status:TodoStatus

    constructor(title:string,description:string,date?:Date) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = TodoStatus.unCompleted;
    }

}

