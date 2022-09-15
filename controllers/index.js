const router = require('express').Router();

const api = require('./api');
const homeRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');

router.use('/api', api);
router.use('/', homeRoutes);
router.use('/dashBoard', dashBoardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;