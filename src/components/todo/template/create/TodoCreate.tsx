import React, { useState } from "react";
import styled from "styled-components";
import { Itodo } from "../../../todo/TodoService";
import { PlusCircleOutlined } from "@ant-design/icons";
import { disabledDate } from "../../../../util/function";
import { DatePicker } from "antd";

const CircleButton = styled.button`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 85%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const GuideMessage = styled.div`
  display: flex;
  justify-content: center;
  color: orange;
  height: 10px;
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [guideMessage, setGuideMessage] = useState("");
  const handleToggle = () => setOpen(!open);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleDatePick = (_, dateString) => setDeadline(dateString);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return setGuideMessage("내용을 입력하세요 :)");
    if (!deadline) return setGuideMessage("날짜를 입력하세요 :)");
    setGuideMessage("");
    createTodo({
      id: nextId,
      text: value,
      done: false,
      deadline
    });
    incrementNextId();
    setValue("");
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleInputChange}
            value={value}
          />
          <DatePicker
            onChange={handleDatePick}
            size="large"
            disabledDate={disabledDate}
          />

          <CircleButton onClick={handleToggle}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
        <GuideMessage>{guideMessage}</GuideMessage>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
