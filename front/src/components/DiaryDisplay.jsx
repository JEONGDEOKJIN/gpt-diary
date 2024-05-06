/* eslint-disable react/prop-types */
import {
  ActionListItem,
  CardContainer,
  CardContent,
  CardTitle,
  DiaryContainer,
  Divider,
  ResultTitle,
} from "./CommonStyles";

import {
  CheckCircleTwoTone,
  HeartTwoTone,
  LoadingOutlined,
  MessageTwoTone,
  SmileTwoTone,
  SoundTwoTone,
  
} from "@ant-design/icons";

import { Image  } from "antd";
import styled from "styled-components";

const ThumbnailImage = styled(Image)`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const DiaryDisplay = ({ data, isLoading }) => {


  return (
    
    <DiaryContainer>
      {isLoading && (
        <>
          <div>
            불러오는 중...
            <LoadingOutlined />
          </div>
        </>
      )}
      <ResultTitle>{data.title}</ResultTitle>

      {/* Divider : margin top 을 20px 줌 -> 이걸 공통 컴포넌트에서 빼서 씀 ⭐⭐ */}
      <Divider />
      <CardContainer>
        <CardTitle>
          <CheckCircleTwoTone
            twoToneColor="#FF9AA2"
            style={{ marginRight: "6px" }}
          />
          요약
        </CardTitle>
        <CardContent> {data.summary} </CardContent>
      </CardContainer>

      {/* <ThumbnailImage src={`https://source.unsplash.com/1600x900/?${data.thumbnail}`} alt="Thumbnail" /> */}
      <ThumbnailImage src={`https://source.unsplash.com/1600x900/?${data.thumbnail}`} alt="Thumbnail" />

      <Divider />
      <CardContainer>
        <CardTitle>
          <HeartTwoTone twoToneColor="#FFB7B2" style={{ marginRight: "6px" }} />
          감성 일기장
        </CardTitle>
        <CardContent> {data.emotional_content} </CardContent>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <SmileTwoTone twoToneColor="#FFDAC1" style={{ marginRight: "6px" }} />
          내가 느낀 감정
        </CardTitle>
        <CardContent> {data.emotional_result} </CardContent>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <MessageTwoTone
            twoToneColor="#B5EAD7"
            style={{ marginRight: "6px" }}
          />
          심리 분석
        </CardTitle>
        <CardContent> {data.analysis} </CardContent>
      </CardContainer>

      <Divider />
      <CardContainer>
        <CardTitle>
          <SoundTwoTone twoToneColor="#C7CEEA" style={{ marginRight: "6px" }} />
          GPT 조언
        </CardTitle>
        <CardContent>
          {data.action_list?.map((item, index) => {
            return <ActionListItem key={index}>{item}</ActionListItem>;
          })}
        </CardContent>
      </CardContainer>
    </DiaryContainer>
  );
};

export default DiaryDisplay;
