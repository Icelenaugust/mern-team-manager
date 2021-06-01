import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./forms.css";

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeTeamMember = this.onChangeTeamMember.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      teamMember: '',
      taskName: '',
      deadline: new Date(),
      status: '',
      teamMembers: [],
      statusArr: ["Incomplete", "Done"]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          teamMember: response.data.teamMember,
          taskName: response.data.taskName,
          deadline: new Date(response.data.deadline),
          status: response.data.status
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/teamMembers/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            teamMembers: response.data.map(teamMember => teamMember.name),
            name: response.data[0].name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTeamMember(e) {
    this.setState({
      teamMember: e.target.value
    })
  }

  onChangeTaskName(e) {
    this.setState({
      taskName: e.target.value
    })
  }

  onChangeDeadline(date) {
    this.setState({
      deadline: date
    })
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      teamMember: this.state.teamMember,
      taskName: this.state.taskName,
      deadline: this.state.deadline,
      status: this.state.status
    }

    console.log(task);

    axios.post('http://localhost:5000/tasks/update/' + this.props.match.params.id, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Team Member: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.teamMember}
              onChange={this.onChangeTeamMember}>
              {
                this.state.teamMembers.map(function(teamMember) {
                  return <option 
                    key={teamMember}
                    value={teamMember}>{teamMember}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Task Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.taskName}
              onChange={this.onChangeTaskName}
              />
        </div>
        <div className="form-group">
          <label>Deadline: </label>
          <div>
            <DatePicker 
              wrapperClassName="datePicker"
              selected={this.state.deadline}
              onChange={this.onChangeDeadline}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Status: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}>
              {
                this.state.statusArr.map(function(status) {
                  return <option 
                    key={status}
                    value={status}>{status}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}