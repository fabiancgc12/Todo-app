import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {CreatePage} from "./pages/createPage";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> } />
                <Route path="/create" element={ <CreatePage/> } />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
