// https://www.selbekk.io/blog/2019/08/how-to-fade-in-content-as-it-scrolls-into-view/
// https://habr.com/ru/post/494670/
import React, { useRef, useEffect, useState } from "react";

const FadeInElement = ({ children, classesList = [], addedClass = "" }) => {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef();
  const constantClasses = classesList.join(" ");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        //   console.log(domRef);
        // domRef.current.style.background =
        //   "#" + Math.floor(Math.random() * 16777215).toString(16);
        setVisible(entry.isIntersecting);
      });
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  // className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
  return (
    <div
      className={`${constantClasses} ${isVisible ? addedClass : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInElement;

// const FadeInSection = (props) => {
//   const [isVisible, setVisible] = useState(true);
//   const domRef = useRef();
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         //   console.log(domRef);
//         // domRef.current.style.background =
//         //   "#" + Math.floor(Math.random() * 16777215).toString(16);
//         setVisible(entry.isIntersecting);
//       });
//     });
//     observer.observe(domRef.current);
//     return () => observer.unobserve(domRef.current);
//   }, []);
//   // className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
//   return (
//     <div
//       className={`align-left slide-in ${isVisible ? "active" : ""}`}
//       ref={domRef}
//     >
//       {props.children}
//     </div>
//   );
// }
