const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
        title: req.body.title,
        post_date_created: new Date(),
        contents: req.body.contents,
        post_creator_id: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const newPost = await Post.findAll({
        where: {
          id: req.params.id
        }
    });
    if(newPost) {
      res.render('update-post');
    }
    else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/update/:id', withAuth, async (req, res) => {
    try {
      const newPost = await Post.update(req.body, {
          where: {
            id: req.params.id
          }
      });
      if(newPost) {
        res.status(200).end();
      }
      else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
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