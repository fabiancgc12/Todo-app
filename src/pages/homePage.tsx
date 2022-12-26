import {TodoList} from "@/component/todoList/todoList";
import React from "react";
import {Box, Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {MainTodo} from "@/component/MainTodo/mainTodo";

export function HomePage(){
    const navigate = useNavigate();
    return (
        <div>
            <Box pos={"relative"}>
                <MainTodo/>
                <Button
                    pos={"absolute"}
                    bottom={-16}
                    right={10}
                    variant="white"
                    color={"violet"}
                    onClick={() => navigate("/create")}
                >
                    Create
                </Button>
            </Box>
            <TodoList/>
        </div>
    )
}