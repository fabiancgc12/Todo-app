import {createContext, Dispatch, ReactNode, SetStateAction, useContext} from "react";
import {TodoModel} from "@/common/models/Todo.model";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {useLocalStorage} from "@/common/hooks/useLocalStorage";

type contextType = [TodoModel[],Dispatch<SetStateAction<TodoModel[]>>];

const TodosContext = createContext<contextType>([] as unknown as contextType)

type props = {
    children:ReactNode
}

const testTodos:TodoModel[] = []

for (let i = 0; i < 4; i++) {
    let status = TodoStatus.Completed
    if (i % 2) status = TodoStatus.Pending
    else if (i % 3) status = TodoStatus.unCompleted
    testTodos.push({
        title:`this is a test ${i} titlenecfklnwelcf nweb cfvkbwriob viobw vioeobvo ie bvioeiveibiorv`,
        description:"testeando todo" + i,
        date: new Date(2022,11,19,4,50),
        status
    },);
}
export function TodosProvider({children}:props){
    const [todos,setTodos] = useLocalStorage({
        key:"todos",
        defaultValue:testTodos,
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