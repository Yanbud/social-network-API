const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const { dateFun } = require('../utils/helper');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: String,
        default: dateFun(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;