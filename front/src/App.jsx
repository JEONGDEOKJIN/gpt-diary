import { useState } from "react";

function App() {

  const [countValue, setCountValue] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const onClickPlusButton = () => {
    console.log("plus button clicked");
    setCountValue(countValue + 1);
  };
  const onClickMinusButton = () => {
    console.log("minus button clicked");
    setCountValue(countValue - 1);
  };

  const onChangeInput = (e) => {
    console.log("input value changed");
    console.log("e.target.value : ", e.target.value);
    setInputValue(e.target.value)
  }

  const onKeyDownInput = (e) => {
    if(e.key == "Enter") {
      setInputValue("")
      const num = Number(inputValue)
      if(Number.isInteger(num)) {
        setCountValue(num)
      }
    }
  }

  return (
    <>
      <section>
        <p>current count : {countValue}</p>
      </section>

      <section>
        <p>count value input</p>
        <input value={inputValue} onKeyDown={onKeyDownInput} onChange={onChangeInput} type="number" />
      </section>

      <section>
        <button onClick={onClickPlusButton}>+</button>
        <button onClick={onClickMinusButton} >-</button>
      </section>
    </>
  );
}

export default App;
