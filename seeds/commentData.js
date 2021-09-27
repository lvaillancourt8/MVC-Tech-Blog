const { Comment } = require('../models');

const commentdata = [
  {
    comment: 'MVC makes life so much easier!',
    comment_date_created: 'September 20, 2021 18:00:00',
    comment_creator_id: 2,
    post_id: 1,
  },
  {
    comment: 'I love OOP!',
    comment_date_created: 'September 21, 2021 10:00:00',
    comment_creator_id: 2,
    post_id: 2,
  },
  {
    comment: 'I love OOP!',
    comment_date_created: 'September 22, 2021 16:00:00',
    comment_creator_id: 1,
    post_id: 3,
  },
  {
    comment: 'Working with Express.js is a joy!',
    comment_date_created: 'September 24, 2021 08:00:00',
    comment_creator_id: 1,
    post_id: 4,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;