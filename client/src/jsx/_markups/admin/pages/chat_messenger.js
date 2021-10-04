import {useRef,useEffect} from 'react'
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import useScrollPosition from "use-scroll-position";
import { useState } from "react";
import avatar1 from "../../../../images/avatar/1.jpg";
import avatar2 from "../../../../images/avatar/2.jpg";
import avatar3 from "../../../../images/avatar/3.jpg";
import avatar4 from "../../../../images/avatar/4.jpg";
import avatar5 from "../../../../images/avatar/5.jpg";
import useAPI from '../../../_apiClient'




function ChatMessenger() {
  return (
    <>
      <PageTitle activeMenu="Messenger" motherMenu="Chat management" />
      <header className="mb-4">
        <h3>Chat Messenger</h3>
      </header>
      <Row style={{ marginBottom: 20, width: "100%" }}>
        <Col>
          <ChatBox>
            <Messenger />
          </ChatBox>
        </Col>
      </Row>
    </>
  );
}

export default ChatMessenger;
const ChatBox = styled(Card)`
  .chat-type-header {
    padding: 20px;
    background-color: #f6f6f677;
    font-weight: 600;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    color: #333;
    /* border-bottom: 1px solid #e6e6e6; */
  }
`;
const ChatGrid = styled.section`
  border-radius: inherit;
  min-height: 500px;
  max-height: 600px;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr auto;
  @media screen and (max-width: 768px){
  grid-template-columns: 1fr
  }
`;

const ChatContacts = styled.div`
  background: #f6f6f677;
  border-bottom-left-radius: inherit;
  grid-area: span 2;
  /* position: sticky;
  top: 0; */
  .contact-first-letter {
    padding: 7px 1rem;
  }
  .contact_single {
    align-items: center;
    border-top: 1px solid #f3f3f3;
    &:hover{
      background: white;
      cursor: pointer;
    }
    .contact_single_info {
      display: flex;
      gap: 10px;
      padding: 8px 1rem;
      align-items: center;

      .img_cont {
        height: 40px;
        width: 40px;
        position: relative;
        img {
          width: 100%;
        }
        .online_icon {
          background: #68cf29;
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 15px;
          right: -1px;
          bottom: 0;
          border: 2px solid #fff;
          &.offline {
            background: #ff4c41;
          }
        }
      }
      .user_info {
        overflow: hidden;
        span {
          font-size: 15px;
          color: #000;
          font-weight: 500;
          line-height: 1;
          margin-bottom: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: block;
          max-width: 170px;
        }
        p {
          font-size: 13px;
          margin-bottom: 0;
          line-height: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: block;
          max-width: 170px;
        }
      }
    }
  }
  @media screen and (max-width: 768px){
    display: none;
    &.active{
      position: absolute;
      display: block
    }
  }
`;

const ChatForm = styled.section`
  display: flex;
  background: #f6f6f677;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  align-items: center;
  .chat-message-input {
    flex-grow: 1;
    > input.message_box {
      width: 100%;
      padding: 1rem 1.5rem;
      border-radius: 32px;
      border: 1px solid #ededed;
      outline: none;
    }
  }
  button {
    border: none;
    background: none;
    padding: 1rem;
    position: relative;
    z-index: 1;
    &::before{
      content: '';
      position: absolute;
      width: 95%;
      height: 95%;
      z-index: -1;
      top:2.5%;
      left: 2.5%;
      display: block;
      background: #ededed;
      border-radius: 100%;
      transform: scale(0);
      transition: transform .25s ease-in;
    }
    &:hover{
      &::before{
        transform: scale(1)
      }
    }
    span {
      z-index:1;
      display: block
    }
  }
`;

const ChatList = styled.section`
  overflow-y: auto;
  padding: 1rem;
  max-height: 100%;
 
`;

const ChatBubble = styled.div`
  --bg: ${(prop) => (prop.send ? `#f9f9f9` : `var(--primary)`)};
  --color: ${(prop) => (prop.send ? `#222` : `#fff`)};
  display: flex;
  margin-bottom: 20px;
  flex-direction: ${(prop) => (prop.send ? `row-reverse` : `row`)};
  gap: 10px;
  .img_cont_msg {
    width: 30px;
    height: 30px;
    display: block;
    max-width: 30px;
    min-width: 30px;
    img {
      width: 100%;
    }
  }
  .msg_container {
    background-color: var(--bg);
    margin-left: 10px;
    max-width: 320px;
    border-radius: ${(prop) =>
      prop.send
        ? `1.375rem 0 1.375rem 1.375rem`
        : `0 1.375rem 1.375rem 1.375rem`};
    padding: 10px 15px;
    color: var(--color);
    position: relative;

    &:after {
      content: "";
      position: absolute;
      border-bottom: 10px solid transparent;
      border-top: 0 solid;
      top: 0;
      ${(prop) =>
        prop.send
          ? `right: -10px;
          border-left: 10px solid #f9f9f9`
          : `
          left: -10px;
          border-right: 10px solid #eb8153;
          border-right-color: var(--bg);
          border-top-color: var(--bg)`}
    }
    .msg_time {
      display: block;
      font-size: 11px;
      color: var(--color);
      margin-top: 5px;
      opacity: 0.5;
    }
  }
`;

function Messenger() {
  const api = useAPI()

  
  const ref = useRef()
  let scrollPosition = useScrollPosition();
  const [toggleChatBox, setToggleChatBox] = useState(true);
  const [openMsg, setOpenMsg] = useState(false);
  const [messages, setMessages] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  
  const handleStartChart = id => e =>{
    let socket
    if(!openMsg){
      setOpenMsg(true)
    }

    if(ref.current){
      socket = ref.current
      if(selectedUser){
        socket.emit("chat::end",selectedUser)
      }
      socket.emit("chat::start",id,(messages)=>{
        console.log("messages",messages)
        setMessages(messages)
      })
      setSelectedUser(id)
    }
  }

  const handleMsgChange = e =>{
    console.log("message",e.target.value)
    e.target.value&&setMessageText(e.target.value)
  }

  const handleSocketConnection = ()=>{
    const socket = api.SocketClient.getAuthSocket()
    socket.on("connect",()=>{
      ref.current = socket
    })
    return socket
  }


  const handleKeyDown = e =>{
    if(e.key==="Enter"){
      if(ref.current&&selectedUser){
        ref.current.emit("chat::message",{
          message:messageText,
          receiverId:selectedUser
        })
      }
      setMessageText('')

    }
  }
  useEffect(() => {
    const socket = handleSocketConnection()
    return () => {
      api.abort()
      socket.disconnect()

    }
  }, [])

  return (
    <div className="">
      <div className="chat-type-header">Type</div>
      <ChatGrid>
        {/* Chat users */}
        <ChatContacts className="chat-users contacts_card dz-chat-user-box">
          <PerfectScrollbar>
            <ul className="contacts">
              <li className="contact-first-letter">A</li>
              <li className="contact_single" onClick={handleStartChart("hhsgsjaua78s7iiaahs")}>
                <div className="contact_single_info bd-highlight">
                  <div className="img_cont">
                    <img
                      src={avatar1}
                      className="rounded-circle user_img"
                      alt=""
                    />
                    {/* <span className="online_icon"></span> */}
                    <span className="online_icon offline"></span>
                  </div>
                  <div className="user_info">
                    <span>Archie Parker</span>
                    <p>Kalid is online</p>
                  </div>
                </div>
              </li>
            </ul>
          </PerfectScrollbar>
        </ChatContacts>

        {/* Chat list*/}
        <ChatList>
          <PerfectScrollbar
            className={`card-body contacts_body p-0 dz-scroll  ${
              toggleChatBox ? "ps ps--active-y" : ""
            }`}
          >
            <ChatBubble send>
              <div class="img_cont_msg">
                <img
                  src="data:image/jpeg;base64,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"
                  class="rounded-circle user_img_msg"
                  alt=""
                />
              </div>
              <div className="msg_container">
                Hi, how are you doing today?
                <span class="msg_time">8:40 AM, Today</span>
              </div>
            </ChatBubble>
            <ChatBubble>
              <div class="img_cont_msg">
                <img
                  src="data:image/jpeg;base64,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"
                  class="rounded-circle user_img_msg"
                  alt=""
                />
              </div>
              <div className="msg_container">
                Hi, I am great, you? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Architecto itaque sunt commodi. Optio
                reprehenderit magnam a rem, vero mollitia iste cum repellendus
                repellat quaerat inventore blanditiis fuga modi. Laudantium,
                earum!
                <span class="msg_time">8:40 AM, Today</span>
              </div>
            </ChatBubble>
            <ChatBubble send>
              <div class="img_cont_msg">
                <img
                  src="data:image/jpeg;base64,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"
                  class="rounded-circle user_img_msg"
                  alt=""
                />
              </div>
              <div className="msg_container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto itaque sunt commodi. Optio reprehenderit magnam a
                rem, vero mollitia iste cum repellendus repellat quaerat
                inventore blanditiis fuga modi. Laudantium, earum!
                <span class="msg_time">8:40 AM, Today</span>
              </div>
            </ChatBubble>
          </PerfectScrollbar>
        </ChatList>

        <ChatForm>
          <div>
            <button type="botton">
              <span className="simple-paper-clip"></span>
            </button>
          </div>
          <div className="chat-message-input">
            <input
              onChange={handleMsgChange}
              value={messageText}
              type="text"
              name="message_box"
              id="message_box"
              className="message_box"
              placeholder="Enter message here..."
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <button type="botton">
              <span className="simple-microphone"></span>
            </button>
          </div>
        </ChatForm>
      </ChatGrid>
    </div>
  );
}
