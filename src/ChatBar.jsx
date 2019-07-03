import React from 'react';


const ChatBar = (props) => {
 
    // EnterPressed = (e) => {
    //     if(e.key === "Enter"){
    // }
    // function processMessage(e) {
    //     props.addMessage()
    // }



    return (<footer className="chatbar">
                <input className="chatbar-username" defaultValue={props.currentUser.name} />
                <input onKeyUp={props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
                <button className="send-button" name="send" type="submit" onClick={props.addMessage}>Send</button>
        </footer>
    )
}




export default ChatBar