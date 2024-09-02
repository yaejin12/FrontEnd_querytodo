import { baseHttp } from "./base"

const AuthApi = {
  signIn({email, password}){
    return baseHttp.post("/user/sign-in", {email, password})
  },

  signUp({email, password}){
    return baseHttp.post("/user/sign-up", {email, password})
  }
}
export default AuthApi