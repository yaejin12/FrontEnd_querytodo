import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = () => {
  const auth = JSON.parse(localStorage.getItem("user"))
  return auth ? <Navigate replace to={"/todo"}/> : <Outlet/>
}
export default PublicRoute