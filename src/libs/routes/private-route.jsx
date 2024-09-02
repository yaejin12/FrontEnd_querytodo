import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const auth = JSON.parse(localStorage.getItem("user"))
  // const [user] = useAuth()

  // 프론트엔드가 로그인된 사용자를 구별해야하는 이유
  // 1. 백엔드에게 내가 나라는걸 증명하기 위해서
  // 2. 상태, 로그인된 사용자가 로그아웃하거나 로그인했을 때 인터페이스


  // 변수 auth는 상태인가요? --- x
  // 로그아웃에 따라 리랜더링이 된다면 Navigate로 페이지 이동을 한다 안한다
  // authProvider의 user의 값이 바뀌고, 로그아웃 시에 따로 페이지 이동


  return auth ? <Outlet/> : <Navigate replace to="/"/> 
}
export default PrivateRoute