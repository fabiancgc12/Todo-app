import {TodoList} from "@/component/todoList/todoList";
import React from "react";
import {Button, Flex} from "@mantine/core";
import {Link} from "react-router-dom";

export function HomePage(){
    return (
        <div>
            <Flex px={"sm"}>
                <Button ml={"auto"} variant="outline">
                    <Link style={{textDecoration:"none"}} to={"/create"} >create</Link>
                </Button>
            </Flex>
            <TodoList/>
        </div>
    )
}