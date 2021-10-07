const router = require('express').Router();
const { Post, User } = require('../models');

// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for a single user
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        post_creator_id: req.session.userId
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ], 
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;