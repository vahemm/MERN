import React from 'react';
import "materialize-css"
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";

function App() {
    const rout = useRoutes(false)
    return (

        <BrowserRouter>
            <div className="container">
                {rout}
            </div>
        </BrowserRouter>
    );
}

export default App;
