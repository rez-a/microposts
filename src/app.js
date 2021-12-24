import { http } from './http';
import { ui } from './ui';
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

function submitPost() {
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
    const id = document.querySelector('#id').value.trim();
    if (title !== '' && body !== '') {
        const data = {
            title,
            body
        }
        if (id === '') {
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    getPosts();
                    ui.showAlert('Post added', 'success');
                    ui.clearInput();
                })
                .catch(err => console.log(err))
        } else {
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post updated', 'success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err))
        }
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

function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }
        ui.fillForm(data);
    }
    e.preventDefault()
}

function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    e.preventDefault();
}