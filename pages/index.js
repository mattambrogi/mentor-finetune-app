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
    setProcessing(true);

    const isFirstMessage = messages.length === 0;

    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userInput },
      ]);
      setUserInput('') // needed to clear out input box, will not clear user input for below

      // state update async, can't guarentee messages array will be up to date for api call
      const updatedMessages = [...messages, { role: "user", content: userInput }];

      console.log(updatedMessages)

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientMessages: updatedMessages
        }),
      });

      const data = await response.json();
      const answer = data.output;

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: answer },
      ]);
      setUserInput("");
      setProcessing(false); // Stop processing once the bot's response is received
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { role: "error" }]);
      setProcessing(false); // Stop processing on error
    }
  };

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatShield}></div>
      {!messages.length ? (
        <div className={styles.ChatHeader}>
          <h2>Socratune</h2>
          <span>
            An LLM fine-tuned on a curated set of wisdom, advice, and insights.
            <br />
            Made by <a href="https://mattambrogi.com" target="_blank" rel="noopener noreferrer">Matt</a>.
          </span>
        </div>
      ) : (
        <div>
          {messages.map((message, index) => (
            message.role === "error" ? (
              <Error key={index} />
            ) : (
              <Message
                key={index}
                type={message.role}
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
