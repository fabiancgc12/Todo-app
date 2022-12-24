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

for (let i = 0; i < 15; i++) {
    let date:Date| undefined = new Date()
    let status = TodoStatus.Completed
    if (i % 2 == 0) {
        status = TodoStatus.Pending
        date.setDate(date.getDate() + 1)
    }
    else if (i % 3 == 0) {
        status = TodoStatus.unCompleted
        date.setDate(date.getDate() + 2)
    } else if (i % 5 == 0) {
        status = TodoStatus.unCompleted
        date = undefined
    }
    testTodos.push({
        id:crypto.randomUUID(),
        title:`this is a test ${i} titlenecfklnwelcf nweb cfvkbwriob viobw vioeobvo ie bvioeiveibiorv`,
        description:"testeando todo" + i,
        date,
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