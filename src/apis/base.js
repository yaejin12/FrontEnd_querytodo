import axios from "axios";

// 로그인 이전 --> baseHttp에 axios.create가 할당
// 새로고침을 하기 전까지 baseHttp의 localStorage.getItem("user").token는
// undefined

export const baseHttp = axios.create({
  baseURL: "http://localhost:3030",
  withCredentials: true,

  // class BaseHttp ----> const baseHttp = new BaseHttp()
  // headers: { ---> baseHttp = () =>
  //   Authorization: `beaer ${localStorage.getItem("user").token}`
  // }

  // cookie 자동 교환
  // server -> 쿠키로 주세요!
  // server -> 요청의 헤더에 주세요 -> local
  // localstorege : 웹 사이트 종료 유지 
  // sessionstorege : 웹 사이트 종료 삭제
})

// rqeuset ---- 가로채서(acees_token) -----> rqeuset ---> backend
baseHttp.interceptors.request.use((config) => {
  // request
  const token = JSON.parse(localStorage.getItem("user"))?.token
  config.headers.Authorization = `Bearer ${token}`
  return config
}, (err) => {
  // error
  return Promise.reject(err)
})


// 백엔드와 에러코드 공유
// 응답을 받기 전에, 리프레쉬는 있는데 토큰이 유효하지 않은경우 분기
// 리프레쉬토큰을 통해, 인증 토큰을 재발급 받고 재요청

baseHttp.interceptors.response.use((response) => {
  return response
}, (err)=>{
  // err.status = 백엔드에서 지정해준 에러코드
  // ex) 401 -- 인증토큰 유효
  // ex) 403 -- 접근권한이 없는 회원
  // ex) 리프레쉬 토큰이 존재하면 errorCode 7001번으로 보낼게요
  
  /* if(err.response.status === 401) --- refresh(o), access_token(x)
     const token = AuthApi.refresh()
     err.config.headers.Authorization = `Bearer ${token}`
     return baseHttp(error.config) // 재요청

     if(err.response.status === 403) -- refresh(x), access_token(x)
     alert("세션이 만료되었습니다")
     Auth.signOut();
     localStorege 비움;
     window.location.href = "/"
  */
  return Promise.reject(err)
})

// refresh
// 백엔드에서 직접 쿠키로 내려주는 경우
// 프론트 엔드- axios -> withCredentials: true,

// 백엔드에서 body에 내려주는 경우 -- 백엔드가 요청 (cookie, header)
// 프론트엔드 - cookie.set()

/*
client (acess_token)---------------------> rquest -----------> bakend
       (error) <-------------------------- response ----------

       분기: refresh x --> logout
             refresh o ---> 재발급 --- request(refresh) -------> backend
                            <---------response(refresh)---------

                      (acces_token) ----- request(origin)------> backend
        <---------------------------------response(origin)------
*/