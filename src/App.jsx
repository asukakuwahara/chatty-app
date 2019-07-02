import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      loading: true}
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render(){
  const asyncSection = this.state.loading ? (
      <Loading />
     ) : (
      <HomeScreen currentUser={this.state.currentUser}/>
     )

     return <div className="container">{asyncSection}</div>;
  }
}

class Loading extends Component {
  render(){
    return (
      <h1>Taking too long to load</h1>
    )
  }
} 

class HomeScreen extends Component {
  constructor(){
    super()
    // this.state = this.state.bind(this);
  }
  render(){
    // console.log(this.props.currentUser)

    return (
      <div className="container">
    <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
  </nav>
  <main className="messages">
    <div className="message">
      <span className="message-username">Anonymous1</span>
      <span className="message-content">I won't be impressed with technology until I can download food.</span>
    </div>
    <div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>
    <ChatBar currentUser={this.props.currentUser} />
  </main>

  </div>
    )
  }
}

export default App;
