import {Dispatch, SetStateAction, useCallback, useState} from "react";

function getStorageValue<T>(key:string, defaultValue:T,deserialize?:(val:string) => T):T {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue
    if (deserialize)
        return deserialize(stored)
    return JSON.parse(stored);
}

type definition<T> = {
    key:string,
    defaultValue:T,
    deserialize?:(val:string) => T
}

export function useLocalStorage<T>({key, defaultValue,deserialize}:definition<T>):[T,Dispatch<SetStateAction<T>>]{
    if (!key)
        throw Error("Key for localStorage not provided")
    const [stored,setStored] = useState(() => getStorageValue(key,defaultValue,deserialize))
    //using useCallback so the reference to the function is always the same
    const setValue:Dispatch<SetStateAction<T>> = useCallback(
        (newState:SetStateAction<T>) => {
            //we use the callback function to avoid bugs with race conditions
            setStored(prevVal => {
                let toStore = newState instanceof Function ? newState(prevVal) : newState;
                localStorage.setItem(key,JSON.stringify(toStore))
                return toStore
            })
        },
        [key,setStored],
    );
    return [stored,setValue]
}