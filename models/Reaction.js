const { Schema, model } = require('mongoose');
const { dateFun } = require('../utils/helper');
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: dateFun(Date.now),
    },

    id: false,
});

module.exports = reactionSchema;