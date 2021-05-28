import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "", password: ""
    });

    const { email, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { email, password };

            const response = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Logged in Successfully");
            } else {
                toast.error(parseRes); 
                setAuth(false);       
          
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5 pt-5 mb-5 text-uppercase">To Do App</h1>
            <div className="container w-50 pb-4 card bg-light">
                <form onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={e => onChange(e)}
                        className="form-control form-control-lg my-4"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => onChange(e)}
                        className="form-control form-control-lg my-4"
                    />
                    <p className="text-center">No account yet? <Link to="/register">Register</Link>.</p>
                    <button className="btn btn-secondary btn-lg float-right">Login</button>
                </form></div>
        </Fragment>
    );
};

export default Login;