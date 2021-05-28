import React, { Fragment, useState, useEffect } from "react";

import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {
        getName()});

    return (
        <Fragment>
            <nav className="navbar fixed-top navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src="https://ionicframework.com/docs/assets/icons/logo-react-icon.png" width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                    Hello, {name}!
                </a>
                <form class="form-inline">
                    <button className="btn btn-outline-secondary my-2 my-sm-0" onClick={e => logout(e)}>Logout</button>
                </form>
            </nav>
            <InputTodo />
            <ListTodos />
        </Fragment>
    );
};

export default Dashboard;