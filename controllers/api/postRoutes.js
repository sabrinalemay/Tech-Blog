const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const auth = require('../../utils/auth');

router.get('/', (req,res) => {
    console.log('--------');
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']],
        includes: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            },
            {
                model: User,
                attributes: ['username', 'github']
            },
        ]
    }).then(postDataDB => res.json(postDataDB))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'github']
            },
            {
                model: Comment,
                attributes: ['id','content_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            }
        ]
    }).then(postDataDB => {
        if (!postDataDB) {
            res.status(404).json({ messsage: 'No post with this id found' });
            return;
        }
        res.json(postDataDB);
    });
});

router.post('/', auth, (req,res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    }).then(postDataDB => res.json(postDataDB))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', auth, (req,res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    },
    {
        where: {
            id: req.params.id
        }
    }).then(postDataDB => {
        if (!postDataDB) {
            res.status(404).json({ message: 'Noo post with this is found' });
            return;
        }
        res.json(postDataDB);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', auth, (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postDataDB => {
        if (!postDataDB) {
            res.status(404).json({ message: 'No post with this id found' });
            return;
        }
        res.json(postDataDB);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;