import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import Navbar from './nav.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      userOnline: 0,
      currentUser: {name:"Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      loading: true,
      color: ''
    }
  }
  //shows home screen when loading ends
  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.setState({ loading:false })

    this.ws.addEventListener('message', (message) =>{
      let messages;
      const msg = JSON.parse(message.data);

      switch(msg.type) {
        case 'incomingMessage':
            messages = this.state.messages.concat(msg)
            this.setState({messages: messages})
            break;
        case 'incomingNotification':
            messages = this.state.messages.concat(msg)
            this.setState({messages: messages})
            break;
        case 'userCount':
            this.setState({userOnline: msg.number})
            break;
        case 'userColor':
            this.setState({color: msg.color})
        default: 
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type on app" + msg.type);
    }
    })
  }
  
  addUser = (e) => {
    if(e.key === "Enter" && e.target.value) {
      const newUser = {name: e.target.value};
      const newType = "postNotification"
      this.setState({ 
        type: newType, 
        currentUser: newUser })
      const user = JSON.stringify({
        type: newType,
        oldUser: this.state.currentUser,
        currentUser: newUser,
      })
      this.ws.send(user)
    }
  }
  addMessage = (e) => {
    if(e.key === "Enter" && e.target.value){
      let date1 = new Date();
      let date = date1.toDateString()
      let time = date1.toLocaleTimeString();
      date1 = time + ' ' + date;
      const message = JSON.stringify({
        type: "postMessage",
        username:this.state.currentUser.name || 'Anonymous',
        content: e.target.value,
        date: date1,
        color: this.state.color
      })
      e.target.value = "";
      this.ws.send(message)
    }
  }

  render()  {

    return (
    <div className="container">
      {this.state.loading ?
      <Loading /> :
      <HomeScreen 
      currentUser={this.state.currentUser} 
      messages={this.state.messages} 
      addMessage={this.addMessage} 
      addUser={this.addUser}
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
  <Navbar userOnline={props.userOnline} />
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
