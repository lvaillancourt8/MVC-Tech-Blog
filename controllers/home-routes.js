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
        User,
        {
          model:Comment,
          include: [User],
        }
      ], 
    });
    const post = dbPostData.get({ plain: true });
    res.render('single-post', { 
      post,
      loggedIn: req.session.loggedIn,
     });
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

router.get('/addpost', (req, res) => {

  res.render('add-post');
});

// router.get('/updatepost/:id', async (req, res) => {
//   try {
//     const dbPostData = await Post.findByPk(req.params.id, {
//       include: [
//         User,
//         {
//           model: Comment
//         }
//       ],
//     });
//     if(dbPostData) {
//       console.log(dbPostData);
//       const post = dbPostData.get({ plain: true });    
//       res.render('update-post', { 
//       post,
//       loggedIn: req.session.loggedIn,
//      });
//     }else {
//       res.status(404).end();
//     }


//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;