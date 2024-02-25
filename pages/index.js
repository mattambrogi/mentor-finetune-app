import React, { useEffect, useRef, useState } from "react";
import Inputarea from "../components/Inputarea/Inputarea";
import styles from "../styles/chat.module.scss";
import Message from "../components/Message/Message";
import Error from "../components/Error/Error";

export default function Chat() {
  const messageEndRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [processing, setProcessing] = useState(false);

  const userInputHandler = (input) => {
    setUserInput(input);
  };

  // Removed typingCompleteHandler since it's no longer needed

  const showLastMessageProperly = () => {
    if (messages.length > 0 && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    showLastMessageProperly();
  }, [messages]);

  const userSubmitHandler = async (event) => {
    event.preventDefault();
    setProcessing(true); // Start processing

    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: userInput },
      ]);
      setUserInput("");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      const output = data.output;
      let answer = output;

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", content: answer },
      ]);
      setProcessing(false); // Stop processing once the bot's response is received
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { type: "error" }]);
      setProcessing(false); // Stop processing on error
    }
  };

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatShield}></div>
      {!messages.length ? (
        <div className={styles.ChatHeader}>
          <h2>Mentor Finetune</h2>
          <span>
            An LLM fine-tuned on a curated set of wisdom, advice, and insights.
            <br />
            Made by <a href="https://mattambrogi.com" target="_blank" rel="noopener noreferrer">Matt</a>.
          </span>
        </div>
      ) : (
        <div>
          {messages.map((message, index) => (
            message.type === "error" ? (
              <Error key={index} />
            ) : (
              <Message
                key={index}
                type={message.type}
                content={message.content}
              />
            )
          ))}
          <div ref={messageEndRef} />
        </div>
      )}
      <Inputarea
        userInput={userInput}
        processing={processing}
        userInputHandler={userInputHandler}
        userSubmitHandler={userSubmitHandler}
      />
    </div>
  );
}
