const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(commentDataDB => res.json(commentDataDB))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', auth, (req, res) => {
    if (res.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        }).then(commentDataDB => res.json(commentDataDB))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentDataDB => {
        if (!commentDataDB) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentDataDB);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
