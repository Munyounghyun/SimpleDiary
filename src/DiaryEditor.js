import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  //DOM사용
  const authorInput = useRef();
  const contentTextarea = useRef();

  //useState합치는 법
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  //이벤트핸들러 합치는법
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //작성자가 없을경우 작성자input으로 focus가게 하기
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      //내용이 5글자 미만일경우 내용textArea로 focus가게 하기
      contentTextarea.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion); //App.js로 데이터 전송
    alert("저장 성공!");
    setState({
      author: "",
      content: "",
      emotion: 1,
    }); // 저장되었으니 내용부분 초기화 작업
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          id="author"
          ref={authorInput}
          name="author"
          placeholder="작성자"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentTextarea}
          id="content"
          name="content"
          placeholder="내용"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        오늘의 감정 점수 :&nbsp;
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor); //이렇게 React.memo사용할 수 도 있음
