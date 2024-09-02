import { useForm } from "react-hook-form";
import TDButton from "components/Button";
import FormInput from "components/FormInput";
import { Form } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import AuthApi from "apis/auth.api";

const SIGNFORM_ARRAY = [
  {
    label: "이메일",
    size: 3,
    name: "email",
    option: {
      placeholder: "이메일을 입력해주세요",
    },
  },
  {
    label: "비밀번호",
    size: 3,
    name: "password",
  },
  {
    label: "비밀번호 확인",
    size: 3,
    name: "password-confirm",
  },
];

const signFormSchema = yup.object().shape({
  email: yup.string().email("이메일 양식이 아닙니다").required(),

  password: yup
    .string()
    .min(8, "비밀번호는 8글자 이상 입력해주세요")
    .required(),

  "password-confirm": yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호 확인이 일치하지 않습니다")
    .required(),
});

const SignUpForm = ({ setFormState }) => {
  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signFormSchema),
  });

  const onSubmitSignUp = async (data) => {
    const resonse = await AuthApi.signUp({
      email: data.email,
      password: data.password
    })
    console.log(resonse)
    if(resonse.data.ok){
      alert(resonse.data.message);
      return setFormState("SIGN-IN");
    }
    // error handling
    // 에러 메세지를 보여줄거야
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmitSignUp)}>
      {SIGNFORM_ARRAY.map((form) => (
        <FormInput
          key={form.name}
          size={form.size}
          label={form.label}
          register={register}
          name={form.name}
          placeholder={form.option?.placeholder}
          error={errors[form.name]?.message}
        />
      ))}
      <TDButton size={"full"} variant={"primary"} disabled={!isValid}>
        회원가입
      </TDButton>
    </S.Form>
  );
};

const S = {
  Form,
};

export default SignUpForm;

// styled-components
// scss + post.css // app.module.scss -> 러닝커브 + 퍼블리셔분들이랑 쉽게 소통
// emotion // styled-components랑 사용법이 완전히 같습니다 - css-in-js - 편해요

// tailwind-css // nextjs 스타트업
// vanilla extract, styleX
//                  ------ meta
