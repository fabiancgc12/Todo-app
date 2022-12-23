import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "@/pages/homePage";
import {CreatePage} from "@/pages/createPage";
import {TodosProvider} from "@/global/todosContext/todosContext";

function App() {
    return (
    <div className="App">
        <TodosProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <HomePage/> } />
                    <Route path="/create" element={ <CreatePage/> } />
                </Routes>
            </BrowserRouter>
        </TodosProvider>
    </div>
  )
}

export default App
