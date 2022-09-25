async function comment(event) {
    event.preventDefault();
    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    if (commentText) {
        const respone = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (respone.ok) {
            document.location.reload();
        } else {
            alert(respone.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', comment);