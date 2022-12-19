import React from "react";
import {describe, it} from "vitest"
import {render, screen} from "@testing-library/react";
import {TodoItem} from "./todoItem";
import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import {TodoStatus} from "@/common/enums/TodoStatus";

describe("TodoItem", () => {

    it('should render a todo description,date and time', function () {
        const todo:TodoModel = {
            title:"this is a title",
            description:"testeando todo",
            date: new Date(2022,11,19,4,50),
            status:TodoStatus.Completed
        }
        render(<TodoItem todo={todo}/>)
        screen.getByText(todo.title)
        screen.getByText(todo.description)
        screen.getByText(dateFormat(todo.date))
        screen.getByText(timeFormat(todo.date))
        screen.getByText(todo.status)
    });
})
