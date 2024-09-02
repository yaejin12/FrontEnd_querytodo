import styled from "styled-components";
import OneTodo from "./oneTodo";

import { useEffect, useState } from "react";
import { useTodo } from "providers/todo-provider";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "consts/metadata";
import TodoApi from "apis/todo.api";

const TodoList = () => {
  const {data: todos} = useQuery({
    queryKey: [QUERY_KEY.GET_TODO],
    queryFn: () => TodoApi.getTodo()
  })

  return (
    <S.Wrapper>
      {todos?.data.map((todo) => (
        <OneTodo key={todo.id} todo={todo} />
      ))}
    </S.Wrapper>
  );
};
export default TodoList;

const Wrapper = styled.div`
  padding: 32px 0;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const S = {
  Wrapper,
};
