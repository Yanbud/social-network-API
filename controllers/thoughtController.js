const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ?
                res.status(404).json({ message: 'No thought with that ID' }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
            })
            .then((user) =>
                !user ?
                res
                .status(404)
                .json({ message: 'Thought created, but found no user with that ID' }) :
                res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then(() => {
                return User.findOneAndUpdate({ _id: req.body.userId }, { $set: { thoughts: req.params.thoughtId } }, { new: true });
            })
            .then((user) =>
                !user ?
                res
                .status(404)
                .json({ message: 'Thought updated, but found no user with that ID' }) :
                res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ?
                res.status(404).json({ message: 'No such thought exists' }) :
                User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true })
            )
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'Thought deleted, but no user found',
                }) :
                res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};