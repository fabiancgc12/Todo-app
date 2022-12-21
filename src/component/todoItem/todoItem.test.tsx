import React from "react";
import {cleanup, render, screen} from "@testing-library/react";
import {TodoItem} from "./todoItem";
import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import {TodoStatus} from "@/common/enums/TodoStatus";
import '@testing-library/jest-dom/'
import userEvent from '@testing-library/user-event'
import {Mock} from "vitest";

const user = userEvent.setup()

describe("TodoItem", () => {
    let todo:TodoModel;
    let changeStatus: Mock<any[], any>;

    beforeEach(() => {
        todo = {
            title:"this is a title",
            description:"testeando todo",
            date: new Date(2022,11,19,4,50),
            status:TodoStatus.Completed
        }
        changeStatus = vi.fn(() => {
            if (todo.status == TodoStatus.Completed)
                todo.status = TodoStatus.unCompleted
            else if (todo.status == TodoStatus.unCompleted)
                todo.status = TodoStatus.Pending
            else if (todo.status == TodoStatus.Pending)
                todo.status = TodoStatus.Completed
        })
    })
    afterEach(() => {
        cleanup()
    })

    it('should render a todo description,date and time', function () {
        const {container} = render(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        screen.getByText(todo.title)
        screen.getByText(todo.description)
        if (todo.date) {
            screen.getByText(dateFormat(todo.date))
            screen.getByText(timeFormat(todo.date))
        }
        const statusButton = screen.getByTestId("status")
        expect(statusButton).toHaveClass(TodoStatus.Completed)
    });

    it('should render status as pending', function () {
        todo.status = TodoStatus.Pending
        render(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        const statusButton = screen.getByTestId("status")
        expect(statusButton).toHaveClass(TodoStatus.Pending)
    });

    it('should render status as uncompleted', function () {
        todo.status = TodoStatus.unCompleted
        render(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        const statusButton = screen.getByTestId("status")
        expect(statusButton).toHaveClass(TodoStatus.unCompleted)
    });

    it('should not render date if not provided', function () {
        todo.date = undefined
        render(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        expect(screen.queryByTestId("date")).not.toBeInTheDocument()
        expect(screen.queryByTestId("time")).not.toBeInTheDocument()
    });

    it('should click button', async () => {
        const {rerender} = render(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        let statusButton = screen.getByTestId("status")
        await user.click(statusButton)
        expect(changeStatus).toHaveBeenCalledTimes(1)
        rerender(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        expect(statusButton).toHaveClass(TodoStatus.unCompleted)
        await user.click(await screen.findByTestId("status"))
        expect(changeStatus).toHaveBeenCalledTimes(2)
        rerender(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        expect(statusButton).toHaveClass(TodoStatus.Pending)
        await user.click(await screen.findByTestId("status"))
        expect(changeStatus).toHaveBeenCalledTimes(3)
        rerender(<TodoItem todo={todo} changeStatus={changeStatus}/>)
        expect(statusButton).toHaveClass(TodoStatus.Completed)
    });

})
