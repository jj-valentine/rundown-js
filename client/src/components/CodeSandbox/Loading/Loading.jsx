import React from "react";
import { CSSTransition } from "react-transition-group";
// Style(s)
import "./loading.scss";

function Loading({ animate }) {
  const circles = new Array(8)
    .fill(null)
    .map((circle, i) => <span key={i} id={`circle-${i}`} style={{ "--i": i }}></span>);
    
  return (
    <div className="loader-container">
      <CSSTransition unmountOnExit timeout={1000} in={animate} classNames="animate-loader">
        <div className="loader">
          { circles }
        </div>
      </CSSTransition>
    </div>
  );
}

export default Loading;