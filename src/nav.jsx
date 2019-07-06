import React, {Component} from 'react';

const Navbar =(props) =>(
<nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <div className="user-count">{props.userOnline}users online</div>
</nav>
)
export default Navbar