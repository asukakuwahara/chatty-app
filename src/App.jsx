import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import generateRandomId from './generateId.jsx'


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id:"hijijji2",
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id:"2233jkjkjl",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],

      loading: true
    }

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages, loading:false})
    }, 3000);
  }
  // addMessage = (e) => {
  //   console.log(e.parent)
  //   if(e.target.name === "send"){
  //     const oldMessages = this.state.messages;
  //     const newMessages = [
  //       ...oldMessages, 
  //       {
  //           id: generateRandomId(), 
  //           username:this.state.currentUser.name,
  //           content: e.target.value
  //       }]
  //     this.setState({messages: newMessages})
  //     e.target.value = "";
  //   }
  // }

  addMessage = (e) => {
    if(e.key === "Enter" ){
    const oldMessages = this.state.messages;
    const newMessages = [
        ...oldMessages, 
        {
            id: generateRandomId(), 
            username:this.state.currentUser.name,
            content: e.target.value
        }]
    this.setState({messages: newMessages})
      e.target.value = "";
    }
  }


  render()  {
    return (
    <div className="container">
      {this.state.loading ?
      <Loading /> :
      <HomeScreen currentUser={this.state.currentUser} messages={this.state.messages} addMessage={this.addMessage}/>
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
    <ChatBar currentUser={props.currentUser} addMessage={props.addMessage}/>
  </div>
)



export default App;
