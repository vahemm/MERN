import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {LinkesPage} from "./Pages/LinkesPage";
import {CreatePage} from "./Pages/CreatePage";
import {DetailPage} from "./Pages/DetailPage";
import {AuthPage} from "./Pages/AuthPage";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" >
                    <LinkesPage/>
                </Route>
                <Route path="/create" >
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/auth">
                <AuthPage/>
            </Route>
            <Redirect to="/auth"/>
        </Switch>
    )
}