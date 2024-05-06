import { useEffect, useState } from "react";
import { callGPT } from "./api/gpt";
import DiaryInput from "./components/DiaryInput";
import styled from "styled-components";
import logo from "./assets/logo.png";
import DiaryDisplay from "./components/DiaryDisplay";
import { message } from "antd";

// const dummyData = JSON.parse(
//   `{
//     "title": "피곤하지만, 잘 해보고 싶다",
//     "thumbnail": "fatigue",
//     "summary": "Feeling tired but motivated to do well, fighting!",
//     "emotional_content": "오늘은 피곤하지만, 내일을 위해 열심히 해보려고 합니다. 자신에게 화이팅을 외치며 힘내는 것이 중요하다고 느꼈습니다.",
//     "emotional_result": "이 일기를 통해 과도한 피로감 속에서도 자신에게 도전적인 자세를 유지하고 있음을 알 수 있습니다. 내면적으로는 책임감과 포용력이 강조됩니다.",
//     "analysis": "다니엘 콜먼의 '당신이 보는 것은 당신 자신이다.'라는 명언처럼, 이 일기는 피로와 도전 사이에서 자아의 모습을 발견하고 있는 당신을 보여줍니다.",
//     "action_list": ["자신을 칭찬해주세요.", "적당한 휴식을 취하세요.", "주변의 도움을 받아도 괜찮습니다."]
//   }`
// );

const App = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();



  const onClickAPICall = async (userInput) => {
    try {
      setIsLoading(true);
      const message = await callGPT({
        prompt: `${userInput}`,
      });
      console.log(">> onClickAPICall message : ", message)
      console.log(">> onClickAPICall message typeof : ", typeof(message))
      
      setData(JSON.parse(message)); // fetch() 로 인해 JSON 형태로 받았고 -> GPT 프롬프트에 JSON 으로 넣으라고 해서 또 다시 parse 해줌
      
      // parsing 없이 해보자 : JSON.parse 가 없으니까 -> js 객체로써 작동이 안 되고 -> 화면에 안 찍히는 것 같음
      // setData(message); // fetch() 로 인해 JSON 형태로 받았고 -> GPT 프롬프트에 JSON 으로 넣으라고 해서 또 다시 parse 해줌

    } catch (error) {
      console.log(">> onClickAPICall error", error.message)
      messageApi.open({
        type: "error",
        content: `${error.message}`,
      });
      return;
    } finally {
      setIsLoading(false); // ⭐⭐⭐ 이렇게, loading 상태를 넣어주는 구나!
    }
  };

  const onSubmitDiaryInput = (userInput) => {
    console.log(">> onSubmitDiaryInput", userInput)
    onClickAPICall(userInput);
  };

  // data 가 JSON 형태 이기 때문에, KEY VALUE 형태로 잘 나옴
  // console.log("data", data);

  return (
    <>
      <AppContainer>
        {contextHolder}
        {/* <div> 전체 : {data}</div> */}
        {/* <div> type : {typeof data}</div> */}

        {/* 이거 다음, 바로 stringfy 없이, data 에 접근하면, 바로 나옴  */}
        {/* <div> stringfy 변환 data : {JSON.stringify(data)}</div> */}

        {/* ⭐⭐ 여기까지 바로 변환하는게 왜 된 거지?  */}
        {/* <div> 바로 변환 title : {data?.title}</div> */}
        {/* <div> 바로 변환 analysis : {data?.analysis}</div> */}

        {/* <div> loading : {isLoading ? "loading" : "finish loading"}</div> */}

        <AppContainer>
          <AppTitle>
            GPT 회고록 <img width={"100px"} src={logo}></img>
          </AppTitle>

          <DiaryInput messageApi={messageApi}  isLoading={isLoading} onSubmit={onSubmitDiaryInput} />

          <DiaryDisplay isLoading={isLoading} data={data} />

          {/* <button onClick={onClickAPICall}> GPT API CALL </button>
          <div> title : {data?.title}</div>
          <div> analysis : {data?.analysis}</div>
          <div> emotional_content : {data?.emotional_content}</div>
          <div> emotional_result : {data?.emotional_result}</div> */}
        </AppContainer>
      </AppContainer>
    </>
  );
};

export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 36px;
  text-align: center;
  font-family: "Noto Serif KR";
`;
