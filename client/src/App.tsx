import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Wiz from "./routes/Wiz";
import Room from "./routes/Room";

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
                    <Route exact path="/room">
                        <Room/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}