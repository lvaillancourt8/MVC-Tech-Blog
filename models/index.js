const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'comment_creator_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'post_creator_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment);


module.exports = { User, Post, Comment };