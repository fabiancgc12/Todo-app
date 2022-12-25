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
    const [stored,setter] = useState(() => getStorageValue(key,defaultValue,deserialize))
    const setValue:Dispatch<SetStateAction<T>> = useCallback(
        (newState:SetStateAction<T>) => {
            const toStore = newState instanceof Function ? newState(stored) : newState;
            localStorage.setItem(key,JSON.stringify(toStore));
            setter(toStore)
        },
        [key,setter],
    );
    return [stored,setValue]
}