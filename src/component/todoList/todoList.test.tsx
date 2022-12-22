import React from "react";
import {cleanup, render} from "@testing-library/react";
import {TodoList} from "./todoList";
import '@testing-library/jest-dom/'
import {TodoModel} from "@/common/models/Todo.model";
import {TodoStatus} from "@/common/enums/TodoStatus";
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const testTodos:TodoModel[] = []

for (let i = 0; i < 10; i++) {
    let status = TodoStatus.Completed
    if (i % 2) status = TodoStatus.Pending
    else if (i % 3) status = TodoStatus.unCompleted
    testTodos.push({
        title:`this is a test ${i} titlenecfklnwelcf nweb cfvkbwriob viobw vioeobvo ie bvioeiveibiorv`,
        description:"testeando todo" + i,
        date: new Date(2022,11,19,4,50),
        status
    },);
}

describe("todoList", () => {
    let todos:TodoModel[] = []
    afterEach(() => {
        todos = [...testTodos]
        cleanup()
    })

    it(`should render ${testTodos.length} items`, () => {
        const {container} = render(<TodoList/>)
        const items = container.firstChild?.childNodes
        expect(items?.length).toBe(testTodos.length)
    })
})