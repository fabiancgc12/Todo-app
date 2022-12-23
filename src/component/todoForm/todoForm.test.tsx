import React from "react";
import {cleanup, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/'
import {TodoModel} from "@/common/models/Todo.model";
import userEvent from '@testing-library/user-event'
import {TodoForm} from "./todoForm";

const user = userEvent.setup()

describe("todoForm", () => {
    let onSubmit
    beforeEach(() => {
        onSubmit = vi.fn((values) => console.log(values))
    })
    afterEach(() => {
        cleanup()
    })

    it('should render todo Title input', async () => {
        render(<TodoForm action={() => {}}/>);
        const title = "this is a new todo"
        screen.getByText("Title")
        let input = screen.getByPlaceholderText("Todo title")
        await user.click(input)
        await user.keyboard(title)
        input = await screen.findByPlaceholderText("Todo title")
        expect(input).toHaveValue("this is a new todo")
    });

    it('should render todo description input', async () => {
        render(<TodoForm action={() => {}}/>);
        const description = "this is the description"
        screen.getByText("Description")
        let input = screen.getByPlaceholderText("Todo description")
        await user.click(input)
        await user.keyboard(description)
        expect(input).toHaveValue(description)
    });

    it('should render todo date input', async () => {
        render(<TodoForm action={() => {}}/>);
        screen.getByText("Date")
        screen.getByLabelText("Date")
    });

    it('should render time input', async () => {
        render(<TodoForm action={() => {}}/>);
        screen.getByText("Hour")
        screen.getByLabelText("Hour")
    });

    it('should disable date and time input if checkbox is unchecked', async () => {
        render(<TodoForm action={() => {}}/>);
        const date = screen.getByPlaceholderText("Todo date")
        expect(date).toHaveProperty("disabled")
        const hour = screen.getByLabelText("Hour")
        expect(hour).toHaveProperty("disabled")
    });

    it('should create a new Todo on submit', async () => {
        const title = "this is a new test";
        let todo:TodoModel;
        const onSubmit = (values:TodoModel) => {
            console.log("holis")
            todo = values
            expect(values).toMatchObject(todo)
        }
        render(<TodoForm action={onSubmit}/>);
        let input = screen.getByPlaceholderText("Todo title")
        let createButton = screen.getByText("Create")
        await user.click(input)
        await user.keyboard(title)

        await user.click(createButton)
    });
})