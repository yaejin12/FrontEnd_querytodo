import styled, { css } from "styled-components";
import FormInput from "../../../components/FormInput";
import TDButton from "../../../components/Button";
import { Form } from "./style";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthApi from "apis/auth.api";
import { useAuth } from "providers/auth-provider";
import { useMutation } from "@tanstack/react-query";

const singInFormSchema = yup.object().shape({
  email: yup.string().email("이메일 양식이 일치하지 않습니다").required(" "),
  password: yup
    .string()
    .min(8, "비밀번호는 8글자 이상이어야합니다.")
    .required(" "),
});

const SignInForm = () => {

  const navigate = useNavigate();
  const [_, setUser] = useAuth();

  const {data, mutate, mutateAsync, isPending, isSuccess, status} = useMutation({
    mutationFn: ({email, password}) => AuthApi.signIn({email, password}),
    onSuccess: () => {
    }
  })

  // mutate, mutateAsync은 mutationFn을 실행시켜주는 함수
  // 단, mutate는 동기로 작동하며 await이 불가능하고 비동기 처리를 위하여 useMutaion의 onSccess를 사용
  //     onSuccess: () => {}

  // mutateAsync은 await 사용이 가능하기 때문에, onSuccess가 아닌 동기적으로 비동기처리가 가능
  // ex) await mutateAsync()
  //     naviagte("/todo")

console.log(isPending)


  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(singInFormSchema),
  });

  const handlePressSignIn = async (data) => {
    try {
      const response = await mutateAsync({
        email: data.email, 
        password: data.password
      });

      const {token, info} = response.data
      if (response.data.ok) {
        localStorage.setItem("user", JSON.stringify({
          token,
          info,
        }))
        setUser(info)
        // return navigate("/todo");
      }
      alert("아이디와 비밀번호를 확인해주세요");
      // token
      // cookie, localstorge



    } catch (err) {
      // error
      console.log(err);
      alert("네트워크 연결이 불안정합니다");
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(handlePressSignIn)}>
      <FormInput
        label={"이메일"}
        placeholder={"email"}
        size={2}
        name="email"
        register={register}
        error={errors.email?.message}
      />
      <FormInput
        label={"비밀번호"}
        size={1}
        containerStyle={css`
          width: 100px;
        `}
        name="password"
        register={register}
        error={errors.password?.message}
      />
      <TDButton variant={"secondary"} size={"medium"} disabled={!isValid || isPending}>
        {isPending ? "Loding": "로그인"}
      </TDButton>
    </S.Form>
  );
};
export default SignInForm;

const Input = styled.input`
  border: 1px solid #999;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  height: 48px;
  &::placeholder {
    text-align: center;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 16px;
  top: -6px;
  font-size: 12px;
  background-color: #fff;
  z-index: 100;
  padding: 0 4px;
`;

const S = {
  Form,
  InputLabel,
  Input,
};
