import React, { Component } from 'react';
import axios from 'axios';

export default class AddMember extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const teamMember = {
      name: this.state.name
    }

    console.log(teamMember);

    axios.post('http://localhost:5000/teamMembers/add', teamMember)
      .then(res => console.log(res.data));

    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Add New Team Member</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Team Member" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}