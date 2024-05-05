import { Input, Button } from "antd";
import { useState } from "react";

import { Title } from "./CommonStyles";

import styled from "styled-components";

const { TextArea } = Input;

// eslint-disable-next-line react/prop-types
const DiaryInput = ({ isLoading, onSubmit , messageApi }) => {
  const [userInput, setUserInput] = useState("");

  // const [messageApi, contextHolder] = message.useMessage();

  // - 사용자 입력’ 을 받고 - 상위 컴포넌트로 데이터 전달

  // - loading 상태 - 제출 버튼 못 누르도록 처리

  const onChangeTextArea = (e) => {
    setUserInput(e.target.value);
  };

  const onClickButton = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 적어주세요",
      });
      return;
    }

    messageApi.open({
      type: "success",
      content: "생성 요청 완료",
    });

    onSubmit(userInput);
    setUserInput(""); // 성공시 입력 초기화
  };

  return (
    <>
    {/* App.js 로 부터, 에러 표시 상태를 받기 때문에, contextHolder 여기는 제거  */}
      {/* {contextHolder} */}

      <Title> 오늘의 일기 </Title>

      <TextArea
        value={userInput}
        onChange={onChangeTextArea}
        placeholder="오늘 일어난 일을 간단히 적어주세요"
        style={{ height: "200px" }}
      />

      <ButtonContainer>
        {/* antd 자체에서, loading 속성에 true 를 주면 -> 빙글빙글 돌아감! */}
        <Button loading={isLoading} onClick={onClickButton}>
          {" "}
          회고록 작성 고고{" "}
        </Button>
      </ButtonContainer>
    </>
  );
};

export default DiaryInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 5px;
`;
