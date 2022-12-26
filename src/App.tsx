import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "@/pages/homePage";
import {CreatePage} from "@/pages/createPage";
import {TodosProvider} from "@/global/todosContext/todosContext";
import {EditPage} from "@/pages/editPage";
import {MantineProvider} from "@mantine/core";

function App() {
    return (
    <div className="App">
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
            <TodosProvider>
                <BrowserRouter basename={"/Todo-app/"}>
                    <Routes>
                        <Route path="/" element={ <HomePage/> } />
                        <Route path="/create" element={ <CreatePage/> } />
                        <Route path="/update/:id" element={ <EditPage/> } />
                    </Routes>
                </BrowserRouter>
            </TodosProvider>
        </MantineProvider>
    </div>
  )
}

export default App
