const { Post } = require('../models');

const postData = [
    {
        title: "Texh-Blog is now live!",
        post_content: "Tech-Blog will allow you to publish articles, blog posts, and your thoughts and opinions",
        user_id: 1
    },
    {
        title: "My-Team-Info is ready for use.",
        post_content: "A webpage that displays my team's basic information so that I can quickly gain access to their emails and Github profiles.",
        user_id: 2
    },
    {
        title: "README-Generator is public!",
        post_content: "Quick way to generate professional README files for your projects.",
        user_id: 3
    }
]
const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;