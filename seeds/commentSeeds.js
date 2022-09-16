const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 2,
        comment_text: "Great job."
    },
    {
        user_id: 2,
        post_id: 2,
        comment_text: "This is very nice."
    },
    {
        user_id: 3,
        post_id: 3,
        comment_text: "This came together really good."
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "That's wonderful news!"
    },
    {
        user_id: 5,
        post_id: 5,
        comment_text: "Keep up the good work."
    },
    {
        user_id: 6,
        post_id: 6,
        comment_text: "Great teamwork!"
    }
]

const commentSeed = () => Comment.bulkCreate(commentData);