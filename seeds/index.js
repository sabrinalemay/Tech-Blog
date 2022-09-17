const postSeeds = require('./postSeeds');
const commentSeeds = require('./commentSeeds');
const userSeeds = require('./userSeeds');

const sequelize = require('../config/connection');

const seedData = async () => {
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE WAS SYNCED-----\n');

    await userSeeds();
    console.log('\n-----USERS WAS SEEDED-----\n');

    await commentSeeds();
    console.log('\n-----COMMENTS WAS SEEDED-----\n');

    await postSeeds();
    console.log('\n-----POSTS WAS SEEDED-----\n');

    process.exit(0);
};

seedData();