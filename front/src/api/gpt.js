export const callGPT = async ({ prompt }) => {
  const messages = [
    {
      role: "system",
      content: `## INFO ##
      you can add images to the reply by URL, Write the image in JSON field 
      Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##`,
    },
    {
      role: "system",
      content: `You are a psychological counselor who writes and analyzes emotional diaries. Proceed in the following order.`,
    },
    {
      role: "user",
      content: `1. [title] : Think of the diary title after understanding the [events] separated by """ at the bottom.
      2. [summarize] : summarize events in order with one line sentence.
      3. [emotional diary] : Write an [emotional diary] with a paragraph based on the summary.
      4. [evaluates] : The written emotional [evaluates], using explore the unconscious based on the contents of the [emotional diary].
      6. [Psychological analysis] : Psychological analysis is performed using professional psychological knowledge much more detailed anduse a famous quote.
      7. [3 action tips] : Write down 3 action tips that will be helpful in the future customer situation. The three action tips must beconverted into JSON Array format.
      8. [image] : Create an image by making the contents so far into one keyword.
      
      
      Translate into Korean and Use the output in the following JSON format:
      { 
          "title": here is [title],
          "thumbnail": here is [image],
          "summary": here is [summarize],
          "emotional_content": here is [emotional diary],
          "emotional_result": here is [evaluates],
          "analysis": here is [Psychological analysis],
          "action_list": here is [3 action tips],
      }
      
      [events]:`,
    },
    {
      role: "user",
      content: `
      """
      ${prompt}
      """
      `,
    },
  ];

  // GPT 호출

  /*
    curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'
*/

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  console.log(">> typeof response", typeof response); // >> typeof response object
  console.log(">>  response", response); // >> typeof response object

  const responseData = await response.json();
  // fetch() 사용으로 인해 -> JSON 데이터를 받게 됨 -> js 에서 바로 사용할 수 없기 때문에 -> json() 으로 1) 접근하고 2) 파싱해서, JS 객체로 변환
  // json() 메서드는 비동기로 처리됨 -> 그래서 await 걸어줘야 함

  /*
    response.json(); 을 쓴 이유
    이 말은 
    0) fetch() 메소드를 사용해서 요청을 보내면
    1) ReadableStream 속성으로 데이터가 넘어옴 
    2) .json() 메소드는 ReadableStream 속성으로된 데이터를 읽고 
    3) JSON 데이터를 파싱해서 -> js 객체로 변환 함
    CF. JSON 이란 ?
      - text based data format following JavaScript object syntax
      - 데이터 포맷임. 그래서, 웹-서버 간 통신에서 데이터를 주고받는데 사용됨
      - typeof 를 찍으면, string 나옴 
      - 다만, 쓰여져 있는 건 '자바스크립트 객체' 를 따름.
      - 그래서, 정리하면, 1) 데이터를 주고받을 때 사용하는 데이터 포맷 으로써 2) typeof 찍으면 string 이고 3) js 객체 문법을 따름!
      - 그래서, json() 메소드를 쓰면 -> 자바스크립트 '배열' 로 변환할 수 있음. 
  */

  console.log(">> callGPT_responseData", responseData);
  console.log(">> typeof responseData", typeof responseData); // >> typeof responseData object

  const message = responseData.choices[0].message.content;
  // const message = responseData.choices[0].message.content;
  console.log(">> callGPT_message", message);
  console.log(">> callGPT_message 타입", typeof message); // string | 여기는 prompt 상 'JSON' 을 뽑으라고 해서, string 이 나온거 아닐까...?
  /* 
    이건, 그 안에 까보니까, string 이 있었던 것 임. 
    string 이 있어
    string 이 있는 이유는, 근데... 음... gpt 프롬프트를 쓸 때, JSON 으로 짜라고 해서! 인 듯!! 
    그래서, app.js 에서, message 를 return 받았을 때도 parse 를 해준다! ⭐⭐⭐
  */

  return message;
};

/*
let beforeUser = '{"name":"kane", "age":3}'
const userJson = JSON.parse(beforeUser);
console.log(userJson); // {name: 'kane', age: 3} 출력
 useEffect(() => {
    console.log(">> beforeUser typeof", typeof(beforeUser)); // string
    console.log(">> userJson typeof", typeof(userJson)); // object
  
 })

 */
