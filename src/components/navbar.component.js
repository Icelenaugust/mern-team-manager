import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this); 
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {  
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">TeamManager</Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Tasks</Link>
                </li>
                <li className="navbar-item">
                <Link to="/membersList" className="nav-link">Members</Link>
                </li>
                <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Task</Link>
                </li>
                <li className="navbar-item">
                <Link to="/addMember" className="nav-link">Add Team Member</Link>
                </li>
            </ul>
        </div>
      </nav>
    ); 
  }
}