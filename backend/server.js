const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( response => {
    console.log("Success!!")
  })
  .catch((error) => {
    console.log("Error is " + error);
  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const tasksRouter = require('./routes/tasks');
const teamMembersRouter = require('./routes/teamMembers');

app.use('/tasks', tasksRouter);
app.use('/teamMembers', teamMembersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});