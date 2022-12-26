import {TodoModel} from "@/common/models/Todo.model";
import {Center, Flex, Text} from "@mantine/core";
import {AiOutlineFieldTime, BsFillCalendarWeekFill} from "react-icons/all";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import React from "react";

type props = {
    todo: TodoModel,
    color?: string
}

export function DisplayDate({todo,color = ""}: props) {
    return <>
        {todo?.date &&
            <Flex gap={20}>
                <Center inline>
                    <BsFillCalendarWeekFill/> <Text data-testid="date"
                                                    c={color}>  {dateFormat(todo.date)}</Text>
                </Center>
                <Center inline>
                    <AiOutlineFieldTime/> <Text data-testid="time"
                                                c={color}>  {timeFormat(todo.date)}</Text>
                </Center>
            </Flex>
        }
    </>;
}