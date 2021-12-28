import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql"
import { Input, Tabs } from 'antd';
import styled from "styled-components";
import ChatBox from "./ChatBox";
import ChatModal from "./ChatModal";
import useChatBox from "../Hooks/useChatBox";
import Title from '../Components/Title';
// import Message from '../Components/Message'

const Wrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    display: flex;
`;

const { TabPane } = Tabs;

const ChatRoom = ({username, bodyRef, displayStatus}) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const {chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const [modalVisible, setModalVisible] = useState(false);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const onCreate = async() => {
        await startChat({
            variables: {
                name1: username,
                name2: activeKey
            }
        });

        setActiveKey(createChatBox(activeKey));
        setModalVisible(false);
    }
    
    return (
        <>
            <Title>
                <h1>{username}'s Chat Rooms</h1>
            </Title>
            <>
                <Wrapper
                    tabBarStyle={{ height: "36px" }}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={activeKey => {
                        setActiveKey(activeKey);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") setModalVisible(true);
                        else if (action === "remove") {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                >
                    {chatBoxes.map((friend) => {
                        return <TabPane tab={friend} closable={true} key={friend}>
                                <ChatBox me={username} friend={friend} key={friend} />
                            </TabPane>
                        
                    })}
                </Wrapper>
                <ChatModal
                    visible={modalVisible}
                    setModalVisible={setModalVisible}
                    onCreate={onCreate}
                    setActiveKey={setActiveKey}
                    activeKey={activeKey}
                    me={username}
                    chatBoxes={chatBoxes}
                />
            </>
            <Input.Search
                ref={bodyRef}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        })
                        return
                    }                
                    
                    sendMessage({
                        variables: {
                            from: username,
                            to: activeKey,
                            message: msg
                        }
                    });
                    setMessageInput("");
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        bodyRef.current.focus()
                }}}
            />
        </>
    )
}

export default ChatRoom;