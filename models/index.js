const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// const { post } = require('../controllers');

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment), {
    foreignKey: 'post_id',
};

Comment.belongsTo(User, {
    foreignKey: 'comment_creator_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'comment_creator_id',
});

Post.belongsTo(User, {
    foreignKey: 'post_creator_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'post_creator_id',
});


module.exports = { User, Post, Comment };