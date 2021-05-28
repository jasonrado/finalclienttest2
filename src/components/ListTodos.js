import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo"

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    
    function timestamp(date){
      const d = new Date (date)
      const year = new Intl.DateTimeFormat('en',{year:'numeric'}).format(d)
      const month = new Intl.DateTimeFormat('en',{month:'short'}).format(d)
      const day = new Intl.DateTimeFormat('en',{day:'2-digit'}).format(d)
      return `${day}-${month}-${year}`
    }

    const deleteTodo = async (id) => {

      try {
          const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
            method: "DELETE"
          });
          setTodos(todos.filter(todo=>todo.todo_id !== id))

       }  catch (err) {
           console.error(err.message);
      }};

  const getTodos = async () => {

      try {
          const response = await fetch(`http://localhost:5000/todos`);
          const jsonData = await response.json();
          console.log(jsonData);
          setTodos(jsonData);

       }  catch (err) {
           console.error(err.message);
      }
  };
  useEffect(() => {
      getTodos();
  },[]);




console.log(todos);
  return <Fragment><table className="table mt-5 text-center">
    <thead>
      <tr>
        <th scope="col">Description</th>
        <th scope="col">Assigned To</th>
        <th scope="col">Category</th>
        <th scope="col">Date</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
     {todos.map(todo=>(
        <tr key = {todo.todo_id}>
          <td>{todo.description}</td>
          <td>{todo.name}</td>
          <td>{todo.category}</td>
          <td>{timestamp(todo.date.split("T",1))}</td>
          <td><EditTodo todo = {todo}/></td>
          <td><button className= "btn btn-danger" onClick = {()=> deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>  
       ))}
    </tbody>
  </table></Fragment>

};

export default ListTodos;