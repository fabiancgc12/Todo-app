import {TodoModel} from "@/common/models/Todo.model";
import {dateFormat} from "@/common/utils/formatDate";
import {timeFormat} from "@/common/utils/formatTime";
import {Flex, Title, Text, Center, createStyles, Box} from "@mantine/core";
import React, {memo} from "react";
import {
    AiOutlineFieldTime,
    BsFillCalendarWeekFill,
} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {StatusIcon} from "@/component/todoItem/StatusIcon";

type props = {
    todo:TodoModel,
    changeStatus: () => void
}

const useStyles = createStyles((theme, _params) => ({
    tittle:{
        overflow:"hidden",
        whiteSpace:"nowrap",
        textOverflow:"ellipsis"
    },
    wrapper:{
        borderBottom:`1px solid ${theme.colors.gray[6]}`
    },
    info:{
        cursor:"pointer"
    }
}))



export const TodoItem = memo(({todo,changeStatus}:props) => {
    const {classes} = useStyles();
    const navigate = useNavigate()
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
            <Box w={"85%"} className={classes.info} onClick={() => navigate(`update/${todo.id}`)}>
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
            <StatusIcon status={todo.status} onClick={changeStatus}/>
        </Flex>
    )
})