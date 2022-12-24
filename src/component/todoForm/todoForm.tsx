import React, {useRef, useState} from "react";
import {Button, Checkbox, Container, Flex, TextInput} from "@mantine/core";
import {DatePicker, TimeInput} from "@mantine/dates";
import {TodoModel} from "@/common/models/Todo.model";
import {useNavigate} from "react-router-dom";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {StatusIcon} from "@/component/todoItem/StatusIcon";

type propsOnEdit = {
    editMode:true,
    deleteAction: () => void
}

type propsCreate = {
    editMode?:false,
    deleteAction?: never
}

type props = {
    action:(todo:TodoModel) => void,
    defaultValue?:Partial<TodoModel>
} & (propsOnEdit | propsCreate)

export function TodoForm({action,editMode,deleteAction,defaultValue = {}}:props){
    const [activateDates,setActivateDates] = useState(!!defaultValue?.date);
    const [date, setDate] = useState( defaultValue?.date || new Date());
    const titleRef = useRef<HTMLInputElement>(null);
    const [titleError, setTitleError] = useState(false);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [descriptionError, setDescriptionError] = useState(false);
    const [status, setStatus] = useState(defaultValue?.status || TodoStatus.unCompleted);
    const navigate = useNavigate();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return
        const todoDate = activateDates ? date : undefined
        // @ts-ignore
        let createdTodo:TodoModel = new TodoModel(titleRef.current.value,descriptionRef.current.value,status,todoDate);
        action(createdTodo)
    }

    const validate = () => {
        if (!titleRef.current?.value){
            setTitleError(true)
            return false
        }
        else
            setTitleError(false)

        if (!descriptionRef.current?.value){
            setDescriptionError(true)
            return false
        }
        else
            setDescriptionError(false)
        return true
    }

    const changeStatus = () => {
        if (status == TodoStatus.Completed)
            setStatus(TodoStatus.unCompleted)
        else if (status == TodoStatus.unCompleted)
            setStatus(TodoStatus.Pending)
        else if (status == TodoStatus.Pending)
            setStatus(TodoStatus.Completed)
    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Flex align={"center"} gap={15}>
                    <StatusIcon status={status} onClick={changeStatus}/>
                    <TextInput
                        placeholder={"Todo title"}
                        w={"100%"}
                        label="Title"
                        ref={titleRef}
                        error={titleError}
                        defaultValue={defaultValue?.title ? defaultValue.title : ""}
                        withAsterisk
                    />
                </Flex>
                <TextInput
                    placeholder={"Todo description"}
                    label="Description"
                    ref={descriptionRef}
                    error={descriptionError}
                    defaultValue={defaultValue?.description ? defaultValue.description : ""}
                    withAsterisk
                />
                <Checkbox
                    data-testid={"shouldHaveDates"}
                    label="Set date"
                    mt={10}
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
                    <Button color="green" type={"submit"}>{editMode ? "Update" : "Create"}</Button>
                    {editMode && <Button color={"red"} onClick={deleteAction}>Delete</Button>}
                </Flex>
            </form>
        </Container>
    )
}

