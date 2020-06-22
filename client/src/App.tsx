import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Wiz from "./wiz/routes/Wiz";
import Room from "./routes/Room";
import Lobby from "./routes/Lobby";
import Rooms from "./routes/RoomCreate";
import Profile from "./routes/Profile";

export default class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/wizard/:id" component={Wiz}>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/lobby">
                        <Lobby/>
                    </Route>
                    <Route exact path="/room/:id" component={Room}>
                    </Route>
                    <Route exact path="/room">
                        <Rooms/>
                    </Route>
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </BrowserRouter>
        )
    }
}