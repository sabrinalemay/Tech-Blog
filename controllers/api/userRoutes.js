const router = require('express').Router();
const { HostNotFoundError } = require('sequelize');
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req,res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(userDataDB => res.json(userDataDB))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: res.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    }).then(userDataDB => {
        if (!userDataDB) {
            res.status(404).json({ message: 'User not found with this id' });
            return;
        }
        res.json(userDataDB);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        github: req.body.github
    }).then(userDataDB => {
        req.session.save(() => {
            req.session.user_id = userDataDB.id;
            req.session.username = userDataDB.username;
            req.session.github = userDataDB.github;
            req.session.loggedIn = true;
            res.json(userDataDB);
        });
    });
});

router.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userDataDB => {
        if (!userDataDB) {
            res.status(400).json({ messae: 'No users with this email address found.' });
            return;
        }

        const verifyPassword = userDataDB.passwordCheck(req.body.password);
        if (!verifyPassword) {
            res.status(400).json({ messae: 'Password is incorrect' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userDataDB.id;
            req.session.username = userDataDB.username;
            req.session.github = userDataDB.github;
            req.session.loggedIn = true;
            res.json({ user: userDataDB, messae: 'You are logged in' });
        });
    });
});

router.post('/logout', (req,res) => {
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', auth, (req,res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(userDataDB => {
        if (userDataDB[0]) {
            res.status(404).json({ message:'User not found with this id' });
            return;
        }
        res.json(userDataDB);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', auth, (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(userDataDB => {
        if (!userDataDB) {
            res.status(404).json({ messae: 'User not found with this id' });
            return;
        }
        res.json(userDataDB);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;