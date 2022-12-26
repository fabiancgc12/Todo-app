import {useTodosContext} from "@/global/todosContext/todosContext";
import {isTodayDate} from "@/common/utils/isTodayDate";
import {Flex, Text, Title, useMantineTheme} from "@mantine/core";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {TodoModel} from "@/common/models/Todo.model";
import {DisplayDate} from "@/component/displayDate/displayDate";
import React from "react";

export function MainTodo() {
    const theme = useMantineTheme();
    const [todos] = useTodosContext();
    const todayTodos = todos.filter(t => t.status !== TodoStatus.Completed && t.date && isTodayDate(new Date(),t.date))
    let bg = theme.fn.gradient({
        from:theme.colors.violet[5],
        to:theme.colors.violet[9]
    })
    if (todayTodos.length === 0 )
        return (
            <Flex
                bg={bg}
                direction={"column"}
                align={"center"}
                gap={10}
                justify={"center"}
                mih={100}
                mah={175}
                p={20}
            >
                <Title order={2}>Nothing to do today!</Title>
            </Flex>
        )
    const mainTodo = todayTodos[0];
    let message = generateMessage(mainTodo);
    if (hasExpired(mainTodo))
        bg = theme.fn.gradient({
            from:theme.colors.red[5],
            to:theme.colors.red[9]
        })
    return (
        <Flex
            bg={bg}
            direction={"column"}
            align={"center"}
            gap={10}
            justify={"space-around"}
            mih={100}
            mah={175}
            p={20}
        >
                <Title order={2} align={"center"}>{message}</Title>
                <Text>{mainTodo.title}</Text>
                <DisplayDate todo={mainTodo}/>
        </Flex>
    )
}

function generateMessage(todo:TodoModel){
    const today = new Date()
    const date = todo.date as Date;
    let prevToMessage:string = "In"
    let timeLeft = date.getTime() - today.getTime();

    if (hasExpired(todo)){
        timeLeft = timeLeft*(-1)
        prevToMessage = "Expired over"
    }
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${prevToMessage} ${hours} hours and ${minutes} minutes`
}

function hasExpired(todo:TodoModel){
    const today = new Date();
    return todo.date && todo.date?.getTime() < today.getTime()
}