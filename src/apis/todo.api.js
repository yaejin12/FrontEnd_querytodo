import { baseHttp } from "./base"


const TodoApi = {
  addTodo({title,content}){
    return baseHttp.post("/todo", {title, content})
  },

  getTodo(){
    return baseHttp.get("/todo")
  },

  updateTodo({todoId, title, content, state}){
    return baseHttp.patch("/todo", {title, content, state}, {
      params: {
        todoId // "/todo?todoId=${todoId}"
      }
    })
  },

  deleteTodo(todoId){
    return baseHttp.delete(`/todo/${todoId}`)
  }
}
export default TodoApi