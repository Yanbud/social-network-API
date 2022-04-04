const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { userData } = require('./data');


connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.collection.insertMany(userData);
    process.exit(0);
});