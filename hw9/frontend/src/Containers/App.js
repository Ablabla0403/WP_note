import { useState, useRef } from 'react'
// import useChat from '../Hooks/useChat'
import { message } from 'antd'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 500px;
	margin: auto;
`;

function App() {
	// const LOCALSTORAGE_KEY = "save-me";
	// const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
	// const { status, messages, sendMessage, clearMessages} = useChat()
	// const [body, setBody] = useState('')  // textBody	 
	const bodyRef = useRef(null) 
	const [signedIn, setSignedIn] = useState(false)
	const [me, setMe] = useState("");

	const displayStatus = (payload) => {
		if (payload.msg) {
			const { type, msg } = payload
			const content = {
				content: msg, duration: 0.5 }
			switch (type) {
				case 'success':
					message.success(content)
				break
				case 'error':
				default:
					message.error(content)
				break
	}}}

	// useEffect(() => {displayStatus(status)}, [status])	
	// useEffect(() => {
	// 	if (signedIn) {
	// 		localStorage.setItem(LOCALSTORAGE_KEY, me);
	// 	}	  
	// }, [signedIn, me]);

	return (
		<Wrapper>
			{!signedIn
			? <SignIn
				me={me}
				setMe={setMe}
				setSignedIn={setSignedIn}
				displayStatus={displayStatus}
			/>
			: <ChatRoom
				// messages={messages}
				// clearMessages={clearMessages}
				// sendMessage={sendMessage}
				username={me}
				// setUsername={setMe}
				bodyRef={bodyRef}
				// body={body}
				// setBody={setBody}
				// sendMessage={sendMessage}
				displayStatus={displayStatus}
			/>}
		</Wrapper>
	)
}

export default App