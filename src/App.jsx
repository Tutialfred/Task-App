import React, {useState, useRef, useEffect} from "react";
import { v4 as uuid4 } from "uuid";
import { TodoList } from "./Components/TodoList";


const KEY = "todoApp.todos."
export function App(){

// ↓ El estado en si, la funcion que hace modificar ese estado
const [todos, setTodos ] = useState([
        {id: 1, task: "one", completed: false}
]);

    const todoTaskRef = useRef()

    useEffect(() =>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if(storedTodos){
            setTodos(storedTodos)
        }
    } , [])
    
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);


    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=> todo.id === id)
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }


    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if(task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuid4(),task, comepleted: false}]
        }) 

        todoTaskRef.current.value = null
    }

    const handleClearAll = () =>{
        const newTodos = todos.filter((e) => !e.completed)
        setTodos(newTodos)
    }

    return(
        <div>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="Write here" autoFocus/>
            <button type="buttom" onClick={handleTodoAdd}>➕</button>
            <button type="buttom" onClick={handleClearAll}>🗑</button>
            <div>te quedan {todos.filter((e) => !e.completed).length} tareas por realizar</div>
        </div>
    )    
}