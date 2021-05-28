import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { description, name, category };

            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(body)


            });
            window.location = "/dashboard";

            console.log(response)
        } catch (err) {
            console.error(err.message);
        }

    };

    return (
        <Fragment>
            <h1 className="text-center mt-5 pt-5">PERN To Do List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm} >
                <input
                    type="text"
                    className="form-control ml-2" placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <input
                    type="text"
                    className="form-control mx-2" placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <select className="form-control mr-2" value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Category</option>
                    <option value="household">Household</option>
                    <option value="school">School</option>
                    <option value="personal">Personal</option>
                    <option value="social">Social</option>
                </select>
                <button className="btn btn-primary">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;