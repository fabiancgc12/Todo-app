import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import {Button, Flex, Title, Container, Text, Center, ActionIcon} from "@mantine/core";
import React, {ReactNode} from "react";
import {
    AiOutlineFieldTime,
    BsFillCalendarWeekFill,
    FaRegCheckCircle,
    FaRegCircle,
    FaRegDotCircle
} from "react-icons/all";
import {TodoStatus} from "@/common/enums/TodoStatus";

type props = {
    todo:TodoModel,
    changeStatus: () => void
}

const buttonIcons:Record<TodoStatus,ReactNode> = {
    [TodoStatus.Completed]:<FaRegCheckCircle size={32}/>,
    [TodoStatus.Pending]:<FaRegDotCircle size={32}/>,
    [TodoStatus.unCompleted]:<FaRegCircle size={32}/>
}

const buttonColors:Record<TodoStatus,string> = {
    [TodoStatus.Completed]:"green.8",
    [TodoStatus.Pending]:"orange.6",
    [TodoStatus.unCompleted]:"gray.6"
}

export function TodoItem({todo,changeStatus}:props){
    return (
        <Flex
            mih={50}
            gap="md"
            justify="space-around"
            align="center"
            direction="row"
            px={"xl"}
            py={"md"}
        >
            <Container w={"85%"}>
                <Title order={3} fz="md" tt="capitalize"
                       sx={{
                           overflow:"hidden",
                           whiteSpace:"nowrap",
                           textOverflow:"ellipsis"
                }}>{todo.title}</Title>
                {todo?.date &&
                <Flex gap={20}>
                    <Center inline>
                        <BsFillCalendarWeekFill/>  <Text data-testid="date">  {dateFormat(todo.date)}</Text>
                    </Center>
                    <Center inline>
                        <AiOutlineFieldTime/>  <Text data-testid="time">  {timeFormat(todo.date)}</Text>
                    </Center>
                </Flex>
                    }
            </Container>
            <ActionIcon
                data-testid="status"
                onClick={changeStatus}
                variant="transparent"
                color={buttonColors[todo.status]}
                size={"lg"}
                className={`status ${todo.status}`}>
                {buttonIcons[todo.status]}
            </ActionIcon>
        </Flex>
    )
}