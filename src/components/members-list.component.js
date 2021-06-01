import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Member = props => (
  <tr>
    <td>{props.member.name}</td>
    <td>
      <Link to={"/teamMember/update/"+props.member._id}>edit</Link> | 
      <a href="#" onClick={() => { props.deleteMember(props.member._id) }}> delete</a>
    </td>
  </tr>
)

export default class MembersList extends Component {
  constructor(props) {
    super(props);

    this.deleteMember = this.deleteMember.bind(this);

    this.state = {
        members: [],
        tasks: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/teamMembers/')
      .then(response => {
        this.setState({ 
            members: response.data 
        })
      })
      .catch((error) => {
        console.log(error);
      })

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

  deleteMember(id) {
    let nameToDelete = '';
    axios.get('http://localhost:5000/teamMembers/'+id)
      .then(response => {
        console.log("the name is " + response.data.name)
        nameToDelete = response.data.name
      })
      .then(res => {
        console.log("name deleted: " + nameToDelete);
        for (var i = 0; i < this.state.tasks.length; i++) {
          if (this.state.tasks[i].teamMember === nameToDelete) {
            axios.delete('http://localhost:5000/tasks/' + this.state.tasks[i]._id);
          }
        }
      })
  
    axios.delete('http://localhost:5000/teamMembers/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      members: this.state.members.filter(el => el._id !== id)
    })
  }

  memberList() {
    return this.state.members.map(currentMember => {
      return <Member member={currentMember} deleteMember={this.deleteMember} key={currentMember._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Member List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.memberList() }
          </tbody>
        </table>
      </div>
    )
  }
}