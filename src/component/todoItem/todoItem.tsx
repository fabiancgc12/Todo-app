import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import {Button, Flex, Title, Container, Text, Center, ActionIcon, createStyles, Box} from "@mantine/core";
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


const useStyles = createStyles((theme, _params, getRef) => ({
    tittle:{
        overflow:"hidden",
        whiteSpace:"nowrap",
        textOverflow:"ellipsis"
    },
    wrapper:{
        borderBottom:`1px solid ${theme.colors.gray[6]}`
    }
}))


export function TodoItem({todo,changeStatus}:props){
    const {classes} = useStyles()
    return (
        <Flex
            mih={50}
            gap="md"
            justify="space-around"
            align="center"
            direction="row"
            py={"md"}
            px={"lg"}
            data-testid={"todoItem"}
            className={classes.wrapper}
        >
            <Box w={"85%"}>
                <Title order={3} fz="md" tt="capitalize" className={classes.tittle}>{todo.title}</Title>
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
            </Box>
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