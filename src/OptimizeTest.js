import React, { useState, useEffect } from "react";

const Textview = React.memo(({ text }) => {
  //props인 text가 바뀌지 않으면 랜더링 되지 않음
  useEffect(() => {
    console.log(`Update :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  //props인 count가 바뀌지 않으면 랜더링 되지 않음
  useEffect(() => {
    console.log(`Update :: Count : ${count}`);
  });
  return <div>{count}</div>;
});

const CounterA = React.memo(({ count }) => {
  //count가 계속 1이므로 리랜더 되지 않음
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });

  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  //얕은 비교를 하기때문에 리랜더 됨
  useEffect(() => {
    console.log(`ConterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});
const CounterB2 = ({ obj }) => {
  useEffect(() => {
    console.log(`ConterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  //   return true; 이전 프롭스 현재 프롭스가 같다 -> 리랜더링을 일으키지 않음
  //   return false; 이전과 현재가 다르다 -> 리랜더링을 일으켜라

  //   if (prevProps.obj.count === nextProps.obj.count) {
  //     return true;
  //   }
  //   return false;
  return prevProps.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB2, areEqual); //리랜더링 안됨

const OptimizeTest = () => {
  //   const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>숫자 더하기</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>Text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <div>
        <h2>
          Count A(그 숫자그대로,+버튼 누를시 같이 카운터 되지만 A버튼누를시
          같은값이므로 리랜더링 되진 않음)
        </h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>
          Count B(B버튼 누를시 둘다 바뀌지 않지만 밑에꺼는 얕은비교로 인해
          리랜더링 됨)
        </h2>
        <MemoizedCounterB obj={obj} />
        <CounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};
export default OptimizeTest;
