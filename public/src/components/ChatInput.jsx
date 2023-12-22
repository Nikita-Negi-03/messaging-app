import React, {useState} from 'react';
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
import styled from 'styled-components';


function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");
    
    const handleEmojiPickerHideShow = ()=> {
        setShowEmojiPicker(!showEmojiPicker);
    }
    let handleEmojiClick = (event,emojiObject) => {
        setMsg((msg) => msg + event.emoji);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && 
                       <EmojiPicker className="emoji-picker" onEmojiClick= {handleEmojiClick} />
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=> sendChat(e)}>
                <input type="text" placeholder='type your message here' value={msg} onChange={(e)=> setMsg(e.target.value)} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color:#080420;
    padding:0 2rem;
    padding-bottom:0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color:white;
        gap:1rem;
        .emoji {
            position:relative;
            svg {
                color: #ffff00c8;
                font-size:1.5rem;
                cursor:pointer;
            }
            .EmojiPickerReact {
                position:absolute;
                top:-470px;
                background-color: #080420;
                box-shadow:0 5px 10px # 9a86f3;
                border-color:#9186f3;
                .epr-body::-webkit-scrollbar {
                    background-color:#080420;
                    width: 5px;
                    &-thumb {
                        background-color:#9186f3;
                    }
                }
                .epr-search {
                    background-color: #080420;
                    border-color:#9186f3;
                }
                li.epr-emoji-category>.epr-emoji-category-label {
                    background-color: #080420;
                    border-color:#9186f3;
                }
            }
        }
    }
    .input-container {
        width:100%;
        border-radius:2rem;
        display:flex;
        align-items:center;
        background-color: #ffffff34;
        gap:2rem;
        input {
            width:90%;
            height:60%;
            background-color:transparent;
            color:white;
            border:none;
            padding-left:1rem;
            font-size:1.2rem;
            &::selection {
                background-color:#9186f3;
            }
            &:focus {
                outline:none;
            }
        }
        button {
            padding:0.3rem 2rem;
            border-radius:2rem;
            diaplay:flex;
            align-items:center;
            background-color:#9186f3;
            border: none;
            svg {
                font-size:2rem;
                color:white;
            }
        }
    }
`;

export default ChatInput;