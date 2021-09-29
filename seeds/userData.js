const { User } = require('../models');
const bcrypt = require('bcryptjs');

var hash1 = bcrypt.hashSync('hash1');
var hash2 = bcrypt.hashSync('hash2');

const userdata = [
  {
    username: 'techBlogUser1',
    email: 'user1@test.com',
    password: hash1,
  },
  {
    username: 'techBlogUser2',
    email: 'user2@test.com',
    password: hash2,
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;