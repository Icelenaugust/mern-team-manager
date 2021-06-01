import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 

import Navbar from "./components/navbar.component"
import TasksList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import AddMember from "./components/add-member.component";
import MembersList from "./components/members-list.component";
import EditMember from "./components/edit-member.component";


function App() {
  
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={TasksList} />
        <Route path="/task/update/:id" component={EditTask} />
        <Route path="/create" component={CreateTask} />
        <Route path="/addMember" component={AddMember} />
        <Route path="/membersList" component={MembersList} />
        <Route path="/teamMember/update/:id" component={EditMember} />
      </div>
    </Router>
  );
}

export default App;
