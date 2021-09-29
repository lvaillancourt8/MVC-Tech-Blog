const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
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
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ], 
    });
    const post = dbPostData.get({ plain: true });
    console.log(post);
    res.render('single-post', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// THIS SHOULD BE MOVED TO DASHBOARD ROUTES BUT IT IS THROWING A 404!!!!!!!!

// GET all posts for a user
router.get('/dashboard', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ 
      where: {
        post_creator_id: 1
      }
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

router.get('/dashboard/add-post', (req, res) => {
    res.render('add-post');
});

router.post('/dashboard/add-post', async (req, res) => {

  const newPost = {
    title: req.body.post-title,
    post_date_created: new Date().toLocaleDateString(),
    contents: req.body.post-text,
    post_creator_id: req.session.userId
};

try {
    const postData = await Post.create(newPost);
    res.json(postData);
}
catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error with submission' });
}
});

module.exports = router;