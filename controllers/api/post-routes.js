const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for creating a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
        title: req.body.title,
        post_date_created: new Date(),
        contents: req.body.contents,
        post_creator_id: req.session.userId,
    });
    res.render('dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to retrieve a single blog post in order to update it
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const newPost = await Post.findByPk(req.params.id);
    if(newPost) {
      const post = await newPost.get({ plain: true});
      res.render('update-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    }
    else {
      res.status(404).end();
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Route to update a single blog post
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
      title: req.body.title,
      contents: req.body.contents,
    }, {
      where: {
        id: req.params.id
      }
    });
    res.render('dashboard');
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Route to delet a single blog post
  router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
      const deletePost = await Post.destroy({
        where: {
          id: req.params.id
        }
      });
      if(deletePost) {
        res.status(200).end();
      }
      else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;