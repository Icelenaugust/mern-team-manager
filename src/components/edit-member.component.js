import React, { Component } from 'react';
import axios from 'axios';

export default class EditMember extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      oldName: '',
      newName: '',
      id: [],
      tasks: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/teamMembers/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          oldName: response.data.name,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:5000/tasks/')
      .then(response => {
          this.setState({
            tasks: response.data,
          })   
      })
      .catch(function (error) {
          console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      newName: e.target.value,
      oldName: e.target.value,
      tasks: this.state.tasks.filter(el => el.teamMember === this.state.oldName)
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const member = {
      name: this.state.newName
    }

    for (var i = 0; i < this.state.tasks.length; i++) {
      
      const updatedTask = {
        teamMember: this.state.newName,
        taskName: this.state.tasks[i].taskName,
        deadline: this.state.tasks[i].deadline,
        status: this.state.tasks[i].status

      }
      axios.post('http://localhost:5000/tasks/update/' + this.state.tasks[i]._id, updatedTask)
        .then(res => console.log(res.data))
    }

    axios.post('http://localhost:5000/teamMembers/update/' + this.props.match.params.id, member)
      .then(res => console.log(res.data))

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Member</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.oldName}
              onChange={this.onChangeName}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Member" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}