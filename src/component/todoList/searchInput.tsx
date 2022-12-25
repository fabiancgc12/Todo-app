import React, {useDeferredValue, useEffect, useState} from "react";
import {createStyles, TextInput} from "@mantine/core";
import {BsSearch} from "react-icons/all";

type props = {
    defaultValue:string,
    cb:(value:string) => void
}

const useStyles = createStyles(() => ({
    input: {
        minWidth:100,
        width:"15%",
        maxWidth:400,
        transition:"width .4s ease-in",
        "&:hover":{
            width:"50%"
        },
        "&:focus":{
            width:"50%"
        }
    }
}))

export function SearchInput({defaultValue,cb}: props) {
    const {classes} = useStyles()
    const [value, setState] = useState(defaultValue)
    const deferred = useDeferredValue(value);
    useEffect(() => {
        cb(deferred)
    },[deferred])
    return (
        <TextInput
            className={classes.input}
            value={value}
            onChange={e => setState(e.target.value)}
            rightSection={<BsSearch size={14}/>}
        />
    )
}