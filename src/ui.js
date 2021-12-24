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
}

export const ui = new UI()