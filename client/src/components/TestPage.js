import React, { useRef } from "react";

const TestPage = () => {
  const containerRef = useRef();
  const h2Ref = useRef();
  const walk = 100; // 100px
  const shadow = (e) => {
    // console.log(e.target);

    // const { offsetWidth: width, offsetHeight: height } = containerRef.current;
    // console.log(width);
    // console.log(e.target.offsetLeft);
    // console.log(containerRef.current)
    const { offsetWidth: width, offsetHeight: height } = containerRef.current;
    let { offsetX: x, offsetY: y } = e;
    if (containerRef.current !== e.target) {
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }
    const xWalk = Math.round((x / width) * walk - walk / 2);
    const yWalk = Math.round((y / height) * walk - walk / 2);
    console.log( h2Ref.current.style)
    h2Ref.current.style.textShadow = "red"//`${xWalk}px ${yWalk}px 0 red`;
    console.log(h2Ref.current.style)
  };

  return (
    <div ref={containerRef} className="test" onMouseMove={shadow}>
      <h2 ref={h2Ref} className="test-heading">
        HEADING
      </h2>
    </div>
  );
};

export default TestPage;
