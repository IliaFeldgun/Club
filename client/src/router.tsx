import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import WizGame from "./routes/Wiz";
import Login from "./routes/Login";
import Home from "./routes/Home";

export default class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/wiz">
                        <WizGame/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}