import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import generateRandomId from './generateId.jsx';
import uuidv4 from 'uuid/v4';


class App extends Component {
  constructor() {
    super();
    this.state = {
      id: uuidv4(),
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      loading: true
    }
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');


    this.ws.addEventListener('open', () => {
      console.log('opened');
      const msg = JSON.stringify({
        id: this.state.id,
        currentUser:this.state.currentUser,
        messages: this.state.messages,
      })
      this.setState({ loading:false})
      this.ws.send(msg);
    });

    this.ws.addEventListener('message', (message) =>{
      const newMessage = JSON.parse(message.data);
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages, loading:false})
    })
  }
  
  addUser = (e) => {
    if(e.key === "Enter") {
      const newUser = {name: e.target.value};
      this.setState({currentUser: newUser})
    }
  }


  addMessage = (e) => {
    if(e.key === "Enter"){
      this.setState({})
    const message = {
      id: generateRandomId(), 
      username:this.state.currentUser.name || 'anonymous',
      content: e.target.value
    }

    e.target.value = "";

    const msg = JSON.stringify(message)
    this.ws.send(msg)
  }
  }

  render()  {
    return (
    <div className="container">
      {this.state.loading ?
      <Loading /> :
      <HomeScreen currentUser={this.state.currentUser} messages={this.state.messages} addMessage={this.addMessage} addUser={this.addUser}/>
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
  </nav>
  <main className="messages">
    <MessageList messages={props.messages}/>
    <div className="message system">
    Anonymous1 changed their name to nomnom.
    </div>
  </main>
    <ChatBar currentUser={props.currentUser} addMessage={props.addMessage} addUser={props.addUser}/>
  </div>
)



export default App;
