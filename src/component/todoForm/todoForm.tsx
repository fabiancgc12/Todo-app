import React, {useState} from "react";
import {Button, Checkbox, Container, Flex, TextInput} from "@mantine/core";
import {DatePicker, TimeInput} from "@mantine/dates";
import {TodoModel} from "@/common/models/Todo.model";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {useNavigate} from "react-router-dom";

type props = {
    action:(todo:TodoModel) => void
}

export function TodoForm({action}:props){
    const [activateDates,setActivateDates] = useState(false);
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return
        const createdTodo:TodoModel = {
            title,
            description,
            status:TodoStatus.unCompleted
        }
        if (activateDates)
            createdTodo.date = date
        action(createdTodo)
    }

    const validate = () => {
        if (!title){
            setTitleError(true)
            return false
        }
        else
            setTitleError(false)

        if (!description){
            setDescriptionError(true)
            return false
        }
        else
            setDescriptionError(false)
        return true
    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <TextInput
                    placeholder={"Todo title"}
                    label="Title"
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    value={title}
                    error={titleError}
                    withAsterisk
                />
                <TextInput
                    placeholder={"Todo description"}
                    label="Description"
                    onChange={(event) => setDescription(event.currentTarget.value)}
                    value={description}
                    error={descriptionError}
                    withAsterisk
                />
                <Checkbox
                    data-testid={"shouldHaveDates"}
                    label="Set date"
                    checked={activateDates}
                    onChange={(event) => setActivateDates(event.currentTarget.checked)}
                />
                <DatePicker
                    placeholder="Todo date"
                    label="Date"
                    value={date}
                    onChange={(val) => {
                        if (!val) return
                        const newDate = new Date(date.getTime())
                        newDate.setFullYear(val.getFullYear())
                        newDate.setMonth(val.getMonth())
                        newDate.setDate(val.getDate())
                        setDate(newDate)
                    }}
                    disabled={!activateDates}
                />
                <TimeInput
                    placeholder="Todo hour"
                    label="Hour"
                    value={date}
                    onChange={(val) => {
                        const newDate = new Date(date.getTime())
                        newDate.setHours(val.getHours())
                        newDate.setMinutes(val.getMinutes())
                        setDate(newDate)
                    }}
                    disabled={!activateDates}
                />
                <Flex mt={10} justify={"space-between"} align={"center"}>
                    <Button color="orange" onClick={() => navigate(-1)}>Go Back</Button>
                    <Button type={"submit"}>Create</Button>
                </Flex>
            </form>
        </Container>
    )

}