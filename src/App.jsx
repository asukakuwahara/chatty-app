import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
// generates random id
import uuidv4 from 'uuid/v4';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userOnline: 0,
      id: uuidv4(),
      currentUser: {name:"Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      loading: true,
    }
  }


  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');

    this.ws.addEventListener('open', () => {
      this.setState({ loading:false})

  })

    this.ws.addEventListener('message', (message) =>{
      let messages;
      const msg = JSON.parse(message.data);

      switch(msg.type) {
        case 'incomingMessage':
            // msg.type = 'postMessage'
            messages = this.state.messages.concat(msg)
            this.setState({messages: messages})
            break;
        case 'incomingNotification':
            // msg.type = 'postNotification'
            messages = this.state.messages.concat(msg)
            this.setState({messages: messages})
            break;
        case 'userCount':
            this.setState({userOnline: msg.number})
            break;
        default: 
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + msg.type);
    }
    })
  }
  
  addUser = (e) => {
    if(e.key === "Enter") {
      const newUser = {name: e.target.value};
      const newType = "postNotification"
      this.setState({ type: newType, oldUser: this.state.currentUser, currentUser: newUser })
      const user = JSON.stringify({
        type: newType,
        id: this.state.id,
        oldUser: this.state.currentUser,
        currentUser: newUser,
      })
      this.ws.send(user)
    }
  }
  addMessage = (e) => {
    if(e.key === "Enter"){
    const message = {
      type: "postMessage",
      id: uuidv4(),
      username:this.state.currentUser.name || 'anonymous',
      content: e.target.value
    }

    e.target.value = "";
    const msg = JSON.stringify(message)
    this.ws.send(msg)
    }
  }

  render()  {;

    return (
    <div className="container">
      {this.state.loading ?
      <Loading /> :
      <HomeScreen 
      currentUser={this.state.currentUser} 
      oldUser={this.state.oldUser}
      messages={this.state.messages} 
      addMessage={this.addMessage} 
      addUser={this.addUser}
      sendNotification={this.sendNotification}
      userOnline={this.state.userOnline}
      />
      }
    </div>
    )
  }
}

const Loading = (props) => (
  <h1>Loading...</h1>
)

const HomeScreen = (props) => (
  <div className="container">
    <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="user-count">{props.userOnline}users online</span>
    </nav>
  <main className="messages">
    <MessageList messages={props.messages}/>
  </main>
    <ChatBar 
    currentUser={props.currentUser}
    addMessage={props.addMessage}
    addUser={props.addUser}
    />
  </div>
)


export default App;
