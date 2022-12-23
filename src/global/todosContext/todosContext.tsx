import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {TodoModel} from "@/common/models/Todo.model";

type contextType = [TodoModel[],Dispatch<SetStateAction<TodoModel[]>>];

const TodosContext = createContext<contextType>([] as unknown as contextType)

type props = {
    children:ReactNode
}
export function TodosProvider({children}:props){
    const [todos,setTodos] = useState<TodoModel[]>([])
    return (
        <TodosContext.Provider value={[todos,setTodos]}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodosContext = () => useContext(TodosContext);