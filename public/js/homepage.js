const blogpostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogpost-title').value.trim();
    const content = document.querySelector('#blogpost-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

const deleteBlogpostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.new-blogpost-form').addEventListener('submit', blogpostFormHandler);

document.querySelector('.blogpost-list').addEventListener('click', deleteBlogpostHandler);
