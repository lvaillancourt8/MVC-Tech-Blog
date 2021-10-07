const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for posting a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
        comment: req.body.comment,
        comment_date_created: new Date(),
        comment_creator_id: req.session.userId,
        post_id: req.body.post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;