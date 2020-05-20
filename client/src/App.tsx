import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Wiz from "./routes/Wiz";

export default class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/wiz">
                        <Wiz/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}