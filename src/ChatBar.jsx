import React from 'react';


const ChatBar = (props) => {

return (<footer className="chatbar">
                <input onKeyPress={props.addUser}className="chatbar-username" defaultValue={props.currentUser.name} />
                <input onKeyUp={props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
                {/* <button className="send-button" name="send" type="submit" onClick={props.addMessage}>Send</button> */}
        </footer>
    )
}




export default ChatBar