const commentsFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const blogpost_id = document.querySelector('#blogpost_id').value.trim();
    //if there is a comment and a blogpost_id, then send the comment and blogpost_id to the server
    if (comment && blogpost_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, blogpost_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comments-form').addEventListener('submit', commentsFormHandler);