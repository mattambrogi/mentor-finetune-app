import React, { useRef, useEffect } from "react";
import styles from "./Inputarea.module.scss";
import Spinner from "../Spinner/Spinner";
import autosize from "autosize";

function Inputarea({
  userInput,
  userInputHandler,
  userSubmitHandler,
  processing,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    autosize(textareaRef.current);
    return () => {
      autosize.destroy(textareaRef.current);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();

      if (processing) return;
      userSubmitHandler(event);
    }
  };

  return (
    <form className={styles.Inputarea} onSubmit={userSubmitHandler}>
      <textarea
        autoFocus={true}
        ref={textareaRef}
        value={userInput}
        onKeyDown={handleKeyDown}
        onChange={(e) => userInputHandler(e.target.value)}
      />
      <button type={processing ? "button" : "submit"}>
        {processing ? (
          <Spinner />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(255, 79, 18)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        )}
      </button>
    </form>
  );
}

export default Inputarea;
