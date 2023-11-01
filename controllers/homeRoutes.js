const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
        include: [
            {
            model: User,
            attributes: ['name'],
            },
        ],
        });
        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.get('/Blogpost/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
        include: [
            {
            model: User,
            attributes: ['name'],
            },
        ],
        });

        if (!blogpostData) {
        res.status(404).json({ message: 'No blogpost found with this id!' });
        return;
        }

        res.status(200).json(blogpostData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: BlogPost }],
    });
    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('signup');
});

module.exports = router;
