import {createContext, Dispatch, ReactNode, SetStateAction, useContext} from "react";
import {TodoModel} from "@/common/models/Todo.model";
import {useLocalStorage} from "@/common/hooks/useLocalStorage";

type contextType = [TodoModel[],Dispatch<SetStateAction<TodoModel[]>>];

const TodosContext = createContext<contextType>([] as unknown as contextType)

type props = {
    children:ReactNode
}

export function TodosProvider({children}:props){
    const [todos,setTodos] = useLocalStorage({
        key:"todos",
        defaultValue:[] as TodoModel[],
        deserialize:(val) => {
            const saved:TodoModel[] = JSON.parse(val)
            return saved.map(t => ({
                ...t,
                date:t.date === undefined ? t.date : new Date(t.date)
            }))
        }
    })
    return (
        <TodosContext.Provider value={[todos,setTodos]}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodosContext = () => useContext(TodosContext);