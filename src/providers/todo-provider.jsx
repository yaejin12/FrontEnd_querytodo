
import TodoApi from "apis/todo.api";
import { createContext, useContext, useState } from "react"


const TodoContext = createContext();


const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState([])

  return <TodoContext.Provider value={[todos, setTodos]}>
    {children}
  </TodoContext.Provider>
}
export default TodoProvider


export const useTodo = () => {
  const [todos, setTodos] = useContext(TodoContext);

  const getTodo = async () => {
    const response = await TodoApi.getTodo()
    console.log(response.data, "data")
    setTodos(response.data)
  }

  const addTodo = async ({title, content}) => {
    await TodoApi.addTodo({title, content})
  }

  const deleteTodo = async({todoId}) => {
    await TodoApi.deleteTodo(todoId)
  }

  const updateTodo = async(args) => {
    await TodoApi.updateTodo(args)
  }

  return {
    todos,
    setTodos,
    getTodo,
    addTodo,
    deleteTodo,
    updateTodo
  }
}