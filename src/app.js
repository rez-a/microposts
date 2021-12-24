import { http } from './http';
import { ui } from './ui';
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

function submitPost() {
    if (document.querySelector('#title').value.trim() !== '' && document.querySelector('#body').value.trim() !== '') {
        const title = document.querySelector('#title').value.trim();
        const body = document.querySelector('#body').value.trim();

        const data = {
            title,
            body
        }
        http.post('http://localhost:3000/posts', data)
            .then(data => {
                getPosts();
                ui.showAlert('Post added', 'success');
                ui.clearInput();
            })
            .catch(err => console.log(err))
    } else {
        ui.showAlert('Please fill in all the fields', 'danger')
    }
}

function deletePost(e) {
    e.preventDefault()
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if (confirm('are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post deleted', 'success');
                    getPosts();
                })
        }
    }
}