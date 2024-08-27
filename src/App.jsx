import React, { useEffect, useRef, useState } from "react";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import homeIcon from "./assets/home.svg";
import saveIcon from "./assets/bookmark.svg";
import upgradeIcon from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToGpt } from "./openAI";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    { text: "Hello, My Self GPT", isBot: true },
  ]);

  const msgEnd = useRef(null);

  // auto scroll to end for new msg from either user or chatgpt
  // it takes effect only when message are upadted
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const userInput = input;
    setInput("");
    setMessages([...messages, { text: userInput, isBot: false }]);
    const res = await sendMsgToGpt(input);
    // console.log(res);

    // appends both message for user and chagpt
    setMessages([...messages, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  const handleQuery = async (e) => {
    const userInput = e.target.value;
    setMessages([...messages, { text: userInput, isBot: false }]);
    const res = await sendMsgToGpt(input);
    setMessages([...messages, { text: res, isBot: true }]);
  };

  return (
    <div className="app">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addBtn} alt="" className="addBtn" />
            New Chat
          </button>
          <div className="uppeSideBottom">
            <button className="query">
              <img
                src={msgIcon}
                alt=""
                className=""
                value="What is Programming?"
                onClick={() => {
                  handleQuery;
                }}
              />
              What is Programming?
            </button>
            <button className="query">
              <img
                src={msgIcon}
                alt=""
                className=""
                value="How to make API call?"
                onClick={() => {
                  handleQuery;
                }}
              />
              How to make API call?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={homeIcon} alt="Home" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saveIcon} alt="Saved" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={upgradeIcon} alt="Upgrade" className="listItemsImg" />
            Upgrade To Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, index) => {
            return (
              <div key={index} className={message.isBot ? "chat bot" : "chat"}>
                <img
                  className="chatImg"
                  src={message.isBot ? gptImgLogo : userIcon}
                  alt=""
                />
                <p className="txt">{message}</p>
              </div>
            );
          })}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={() => handleEnter}
            />
            <button className="send">
              <img src={sendBtn} alt="Send" onClick={() => handleSend} />
            </button>
          </div>
          <p>
            ChatGPT may product inaccurate information about people, places or
            facts. ChatGPT August 28 Version
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
