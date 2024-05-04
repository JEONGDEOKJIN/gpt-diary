import { useState } from "react";
import { callGPT } from "./api/gpt";
import Counter from "./components/Counter";

const dummyData = JSON.parse(
  `{
    "title": "피곤하지만, 잘 해보고 싶다",
    "thumbnail": "피곤",
    "summary": "Feeling tired but motivated to do well, fighting!",
    "emotional_content": "오늘은 피곤하지만, 내일을 위해 열심히 해보려고 합니다. 자신에게 화이팅을 외치며 힘내는 것이 중요하다고 느꼈습니다.",
    "emotional_result": "이 일기를 통해 과도한 피로감 속에서도 자신에게 도전적인 자세를 유지하고 있음을 알 수 있습니다. 내면적으로는 책임감과 포용력이 강조됩니다.",
    "analysis": "다니엘 콜먼의 '당신이 보는 것은 당신 자신이다.'라는 명언처럼, 이 일기는 피로와 도전 사이에서 자아의 모습을 발견하고 있는 당신을 보여줍니다.",
    "action_list": ["자신을 칭찬해주세요.", "적당한 휴식을 취하세요.", "주변의 도움을 받아도 괜찮습니다."]
  }`
);

const App = () => {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const onClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await callGPT({
        prompt: `피곤하지만, 잘 해보고 싶다. 화이팅!`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      console.log("👉 onClickAPICall error", error);
    } finally {
      setIsLoading(false); // ⭐⭐⭐ 이렇게, loading 상태를 넣어주는 구나!
    }

  };
  
  // data 가 JSON 형태 이기 때문에, KEY VALUE 형태로 잘 나옴
  console.log("data", data);


  return (
    <>
      <button onClick={onClickAPICall}> GPT API CALL </button>

      {/* <div> 전체 : {data}</div>
      <div> type : {typeof data}</div>
      <div> title : {data?.title}</div> */}

      {/* 이거 다음, 바로 stringfy 없이, data 에 접근하면, 바로 나옴  */}
      {/* <div> stringfy 변환 data : {JSON.stringify(data)}</div> */}

      {/* ⭐⭐ 여기까지 바로 변환하는게 왜 된 거지?  */}
      <div> 바로 변환 title : {data?.title}</div>
      <div> 바로 변환 analysis : {data?.analysis}</div>

      <div> loading : {isLoading ? "loading" : "finish loading"}</div>

      <Counter />
    </>
  );
};

export default App;
