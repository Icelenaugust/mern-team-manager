const router = require('express').Router();
let TeamMember = require('../models/teamMember.model');

router.route('/').get((req, res) => {
    TeamMember.find()
        .then(teamMembers => res.json(teamMembers))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newTeamMember = new TeamMember({ name });

    newTeamMember.save()
        .then(() => res.json('TeamMember added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    TeamMember.findById(req.params.id)
        .then(member => res.json(member))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    TeamMember.findByIdAndDelete(req.params.id)
        .then(member => res.json('Member deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    TeamMember.findById(req.params.id)
        .then(member => {
            member.name = req.body.name;

            member.save()
                .then(() => res.json('Member updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;