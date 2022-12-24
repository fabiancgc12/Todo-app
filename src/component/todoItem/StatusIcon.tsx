import {ActionIcon} from "@mantine/core";
import React, {ReactNode} from "react";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {FaRegCheckCircle, FaRegCircle, FaRegDotCircle} from "react-icons/all";

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

type props = {
    status:TodoStatus,
    onClick:() => void
}

export function StatusIcon({status,onClick}:props){
    return (
        <ActionIcon
            data-testid="status"
            onClick={onClick}
            variant="transparent"
            color={buttonColors[status]}
            size={"lg"}
            className={`status ${status}`}>
            {buttonIcons[status]}
        </ActionIcon>
    )
}