import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {

  const [name, setName] = useState(todo.name)
  const [category, setCategory] = useState(todo.category)
  const [description, setDescription] = useState(todo.description)

  const update = async e => {
    e.preventDefault();
    try {
      const body = { description, name, category }
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      window.location = "/";

    } catch (err) {
      console.error(err.message)
    }
  }
  return (
    <Fragment>

      <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
      </button>


      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <input className="form-control mt-2" type="text" value={description} onChange={e => setDescription(e.target.value)} />
              <input className="form-control mt-2" type="text" value={name} onChange={e => setName(e.target.value)} />
              <select class="form-control mt-2" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Category</option>
                <option value="Household">Household</option>
                <option value="School">School</option>
                <option value="Personal">Personal</option>
                <option value="Social">Social</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => update(e)}>Edit</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>


    </Fragment>
  )
}

export default EditTodo;