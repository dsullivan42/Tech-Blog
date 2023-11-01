const router = require('express').Router();
const { Comments, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments from the db
router.get('/', (req, res) => {
    Comments.findAll({})
    .then((commentData) => {
        res.status(200).json(commentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET a single comment by id
router.get('/:id', (req, res) => {
    Comments.findAll({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    })
    .then((commentData) => {
        res.status(200).json(commentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comments.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
    
        if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
        }
    
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
    });
    module.exports = router;