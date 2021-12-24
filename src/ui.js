class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = ``;
        posts.forEach(post => {
            output += `
                    <div class="col-3">
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h4 class="card-title">${post.title}</h4>
                                        <p class="card-text">${post.body}</p>
                                        <div class="text-end">
                                            <a class="edit text-success" data-id="${post.id}" href="#"><i class="bi bi-pencil-fill"></i></a>
                                            <a class="delete text-danger" data-id="${post.id}" href="#"><i class="bi bi-trash-fill"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `
        })
        this.post.innerHTML = output;
    }
    fillForm(data) {
        this.bodyInput.value = data.body;
        this.titleInput.value = data.title;
        this.idInput.value = data.id;
        this.changeFormState('edit');
    }
    changeFormState(state) {
        if (state === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.classList.replace('btn-primary', 'btn-warning');

            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-secondary';
            button.appendChild(document.createTextNode('Cancel Edit'))
            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.classList.replace('btn-warning', 'btn-primary');
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            this.clearInput();
        }
    }
    showAlert(alertText, status) {
        this.clearAlert();
        const alert = `<div class="alert alert-${status} alert-dismissible fade show my-3" role="alert">
        ${alertText}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        document.querySelector('.showalert').innerHTML = alert;
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000)
    }
    clearInput() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
        this.idInput.value = '';
    }
    clearAlert() {
        let alert = document.querySelector('.alert');
        if (alert) {
            alert.remove()
        }
    }
}

export const ui = new UI()