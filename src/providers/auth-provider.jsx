import { createContext, useState, useContext, useEffect } from "react"


const AuthContext = createContext() // 1. 빈 저장소 생성
export const useAuth = () => useContext(AuthContext)
// 4. 편이하게 사용 가능한 커스텀 훅 만들기

const AuthProvider = ({children}) => { // 2. 프로바이더 생성
                                      // 사용가능한 스코프를 정하기 위해
  const [user, setUser] = useState()
  // 3. 전역 관리하고 싶은 상태 값 내려주기

  useEffect(()=>{
    const userRepository = JSON.parse(localStorage.getItem("user"))
    if(!userRepository) return;
    setUser(userRepository.info)
  }, [])

  return <AuthContext.Provider value={[user, setUser]}>
    {children}
  </AuthContext.Provider>
}
export default AuthProvider