import {TodoModel} from "@/common/models/Todo.model";
import {Box, createStyles, Flex, Title} from "@mantine/core";
import React, {memo} from "react";
import {useNavigate} from "react-router-dom";
import {StatusIcon} from "@/component/todoItem/StatusIcon";
import {DisplayDate} from "@/component/displayDate/displayDate";

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
    const navigate = useNavigate();
    const today = new Date();
    //checking if its expired
    let dateColor = ""
    if (todo?.date && today > todo.date)
        dateColor = "red.7";
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
                <DisplayDate todo={todo} color={dateColor}/>
            </Box>
            <StatusIcon status={todo.status} onClick={changeStatus}/>
        </Flex>
    )
})