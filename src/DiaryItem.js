import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, create_date, emotion, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit); //isEdit이 true면 false로 바뀌고 false였다면 true로 마꿈

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();
  const handleRemove = () => {
    if (window.confirm(`${id + 1}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    } //삭제하기 버튼 누를시 확인창 뜨게만듬 확인 누를시 삭제
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id + 1}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <h4>{id + 1}번째 일기</h4>
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(create_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
