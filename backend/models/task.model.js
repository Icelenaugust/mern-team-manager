const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    teamMember: { type: String, required: true },
    taskName: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;