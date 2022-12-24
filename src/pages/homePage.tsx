import {TodoList} from "@/component/todoList/todoList";
import React from "react";
import {Button, Flex} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export function HomePage(){
    const navigate = useNavigate();
    return (
        <div>
            <Flex px={"sm"}>
                <Button ml={"auto"} variant="outline" onClick={() => navigate("/create")}>
                    Create
                </Button>
            </Flex>
            <TodoList/>
        </div>
    )
}