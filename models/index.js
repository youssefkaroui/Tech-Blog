const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Comment, {
  foreignKey: 'userId'
});

Comment.belongsTo(User);

Post.hasMany(Comment, {
  foreignKey: 'postId'
});

Comment.belongsTo(Post);



module.exports = { User, Post, Comment };