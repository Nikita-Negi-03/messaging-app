import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {allUsersRoutes, host} from '../utils/ApiRoutes';
import axios from 'axios';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"

function Chat() {
    let navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts]= useState([]);
    const [currentUser, setCurrentUser]= useState(undefined);
    const [currentChat, setCurrentChat]= useState(undefined);
    const [isLoaded, setIsLoaded]= useState(false);
    
    useEffect(() => {
        async function fetchDataAndContacts() {
            if (!localStorage.getItem('chat-app-user')) {
                navigate("/login");
            } else {
                let user = await JSON.parse(localStorage.getItem('chat-app-user'));
                setCurrentUser(user);
                setIsLoaded(true)
                if (user && user.isAvatarImageSet) {
                    console.log(`${allUsersRoutes}/${user._id}`);
                    try {
                        let data = await axios.get(`${allUsersRoutes}/${user._id}`);
                      
                        setContacts(data.data);
                    } catch (error) {
                        console.error("Error fetching contacts:", error);
                    }
                } else {
                    navigate("/setAvatar");
                }
                if(user) {
                    socket.current = io(host);
                    socket.current.emit("add-user", user._id)
                }
            }
        }
        fetchDataAndContacts();
    }, []); 


    const handleChatChange=(chat)=>{
        setCurrentChat(chat);
    }

    return (
        <Container>
            <div className='container'>
                <Contacts contacts={contacts} currentUser= {currentUser} changeChat= {handleChatChange}  />
                {isLoaded && (
                    currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                        ) : (
                            <ChatContainer currentChat ={currentChat } currentUser={currentUser} socket={socket}  />
                        )
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    gap: 1rem;
    background-color: #131324;
    .container {
        height: 85vh;
        width:85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width:720px) and (max-width:1080px){
            grid-template-column: 35% 65%;
        }
    }
`;

export default Chat;