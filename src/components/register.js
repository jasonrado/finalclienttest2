import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({ email: "", password: "", name: "" });
    const { email, password, name } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await fetch("http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Register Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5 pt-5 mb-5">Create an Account</h1>
            <div className="container w-50 pb-4 card bg-light">
                <form onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Username"
                        onChange={e => onChange(e)}
                        className="form-control form-control-lg my-4"
                    />
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
                    <p className="text-center">Already have an account? <Link to="/login">Log-in</Link>.</p>
                    <button className="btn btn-primary btn-lg float-right">Sign Up</button>
                </form></div>
        </Fragment>
    );
};

export default Register;