import React from "react";
import {afterEach, beforeEach, describe, expect, it} from "vitest"
import {cleanup, render, screen} from "@testing-library/react";
import {TodoItem} from "./todoItem";
import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import {TodoStatus} from "@/common/enums/TodoStatus";

describe("TodoItem", () => {
    let todo:TodoModel
    beforeEach(() => {
        todo = {
            title:"this is a title",
            description:"testeando todo",
            date: new Date(2022,11,19,4,50),
            status:TodoStatus.Completed
        }
    })
    afterEach(() => {
        cleanup()
    })

    it('should render a todo description,date and time', function () {
        const {container} = render(<TodoItem todo={todo}/>)
        screen.getByText(todo.title)
        screen.getByText(todo.description)
        if (todo.date) {
            screen.getByText(dateFormat(todo.date))
            screen.getByText(timeFormat(todo.date))
        }

        const statusButton = container.querySelector(".status")
        expect(statusButton?.classList.contains(todo.status.toString())).toBe(true)
    });

    it('should render status as pending', function () {
        todo.status = TodoStatus.Pending
        const {container} = render(<TodoItem todo={todo}/>)
        const statusButton = container.querySelector(".status")
        expect(statusButton?.classList.contains(todo.status.toString())).toBe(true)
    });

    it('should render status as uncompleted', function () {
        todo.status = TodoStatus.UnCompleted
        const {container} = render(<TodoItem todo={todo}/>)
        const statusButton = container.querySelector(".status")
        expect(statusButton?.classList.contains(todo.status.toString())).toBe(true)
    });

    it('should not render date if not provided', function () {
        todo.date = undefined
        render(<TodoItem todo={todo}/>)
        expect(screen.queryByTestId("date")).toBeNull()
        expect(screen.queryByTestId("time")).toBeNull()
    });
})
