import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  //     const [count, setCount] = useState(0);
  //     const [text, setText] = useState("");

  //     useEffect(() => {
  //       console.log("Mount!");
  //     }, []); //Mount

  //     useEffect(() => {
  //       console.log("Update!");
  //     }); //Update

  //     useEffect(() => {
  //       console.log(`count is update: ${count}`);
  //       if (count > 5) {
  //         alert("count가 5를 넘었습니다. 따라서 1로 초기화 합니다.");
  //         setCount(1);
  //       }
  //     }, [count]);

  //   useEffect(() => {
  //     console.log(`text is update : ${text}`);
  //   }, [text]);
  //deps를 잘 활용하면 감지하고 싶은 값만 감지하여 콜백함수를 실행시킬수 있다.

  const UnmountTest = () => {
    useEffect(() => {
      console.log("Mount!");
      return () => {
        //Unmount시점에 실행되게 됨
        console.log("Unmount!");
      };
    }, []);
    return <div>Unmount Testing Component</div>;
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible); //토글

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      {/*  isVisible이 true이면 UnmountTest 가
      랜더링이 되고 아니면 랜더링이 되지 않는다 */}

      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} /> */}
    </div>
  );
};

export default Lifecycle;
