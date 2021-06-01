import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
  <tr>
    <td>{props.task.teamMember}</td>
    <td>{props.task.taskName}</td>
    <td>{props.task.deadline.substring(0,10)}</td>
    <td>{props.task.status}</td>
    <td>
      <Link to={"/task/update/"+props.task._id}>edit</Link> | 
      <a href="#" onClick={() => { props.deleteTask(props.task._id) }}> delete</a> | 
      <a href="#" onClick={() => { props.doneTask(props.task._id) }}> done</a>
    </td>
  </tr>
)

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.doneTask = this.doneTask.bind(this);

    this.state = {
        teamMember: '',
        taskName: '',
        deadline: new Date(),
        status: '',
        tasks: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/')
      .then(response => {
        this.setState({ 
            tasks: response.data 
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/tasks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  doneTask(id) {
    axios.get('http://localhost:5000/tasks/'+id)
      .then(response => {
        this.setState({
            teamMember: response.data.teamMember,
            taskName: response.data.taskName,
            deadline: new Date(response.data.deadline),
            status: "Done"
        })  
        const task = {
            teamMember: this.state.teamMember,
            taskName: this.state.taskName,
            deadline: this.state.deadline,
            status: "Done"
        } 

        axios.post('http://localhost:5000/tasks/update/' + id, task)
            .then(response => { console.log(response.data)})
            .then(window.location = '/')
            .catch((error) => console.log("THIS STUPID ERROR " + error));
        })
        .catch(function (error) {
            console.log(error);
        })
  }


  taskList() {
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} doneTask={this.doneTask} deleteTask={this.deleteTask} key={currenttask._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Task List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Team Member</th>
              <th>Task Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>
      </div>
    )
  }
}