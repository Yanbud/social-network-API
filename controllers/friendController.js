const { User } = require('../models');

module.exports = {

    createFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((friend) =>
                !friend ?
                res
                .status(404)
                .json({ message: 'Friend added, but found no user with that ID' }) :
                res.json(friend)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((friend) =>
                !friend ?
                res
                .status(404)
                .json({ message: 'Friend added, but found no user with that ID' }) :
                res.json(friend)
            )
            .catch((err) => res.status(500).json(err))
    }
};