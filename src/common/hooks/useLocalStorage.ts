import {Dispatch, SetStateAction, useCallback, useState} from "react";

function getStorageValue<T>(key:string, defaultValue:T,deserialize?:(val:string) => T):T {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue
    if (deserialize)
        return deserialize(saved)
    return JSON.parse(saved);
}

type definition<T> = {
    key:string,
    defaultValue:T,
    deserialize?:(val:string) => T
}

export function useLocalStorage<T>({key, defaultValue,deserialize}:definition<T>):[T,Dispatch<SetStateAction<T>>]{
    if (!key)
        throw Error("Key for localStorage not provided")
    const [value,setter] = useState(() => getStorageValue(key,defaultValue,deserialize))
    const setValue:Dispatch<SetStateAction<T>> = useCallback(
        (newState:SetStateAction<T>) => {
            setter(prevVal => {
                let newVal:T;
                if (newState instanceof Function)
                    newVal = newState(prevVal)
                else
                    newVal = newState
                localStorage.setItem(key,JSON.stringify(newVal))
                return newVal
            })
        },
        [key,setter],
    );
    return [value,setValue]
}