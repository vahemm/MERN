import React from 'react';
import "materialize-css"
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./component/NavBar";
import {Loader} from "./component/Loader";

function App() {

    const {token, userID, logout, login, ready} = useAuth();
    const isAuthenticated = !!token;
    const rout = useRoutes(isAuthenticated);
    if (!ready){
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{token, userID, login, logout, isAuthenticated}}>
            <BrowserRouter>
                {isAuthenticated && <NavBar/>}
                <div className="container">
                    {rout}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
