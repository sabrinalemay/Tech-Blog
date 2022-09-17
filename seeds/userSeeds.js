const { User } = require('../models');

const userData = [
    {
        username: "sabrina_l",
        github: "sabrinasgithub",
        email: "sabrina@email.com",
        password: "sabrinapassword"
    },
    {
        username: "joey_c",
        github: "joeysgithub",
        email: "joeys@email.com",
        password: "joeyspassword"
    },
    {
        username: "christy_l",
        github: "christysgithub",
        email: "christy@email.com",
        password: "christyspassword"
    },
    {
        username: "carlos_a",
        github: "carlosgithub",
        email: "carlos@email.com",
        password: "carlospassword"
    }
]

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;