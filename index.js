window.addEventListener('DOMContentLoaded', () => {

    const todoField = document.querySelector('.todo-field');
    const postsField = document.querySelector('.posts-field');
    const select = document.getElementById('select');


    // TODO start
    const showLoadingNotification = (node) => {
        node.innerText = 'Loading...'
    }

    const clearTodoFieldChildren = (node) => {
        node.innerHTML = '';
    }
    const createLikeNode = () => {
        const like = document.createElement('div');
        like.classList.add('like');
        const img = document.createElement('img');
        img.src = './like.svg';
        like.appendChild(img);

        return like;
    }
    const createTodosList = async (limit = 10) => {

        try {
            showLoadingNotification(todoField);
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
            const todos = await response.json();
            if (todos) {
                clearTodoFieldChildren(todoField);
                todos.forEach((todo) => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const cardBody = document.createElement('div');
                    card.classList.add('card-body');

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerText = `Пользователь ${todo.userId}`;

                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.innerText = todo.title;

                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);

                    card.appendChild(cardBody);

                    // добавляем лайк и красим зеленым
                    if (todo.completed) {
                        const likeNode = createLikeNode();
                        card.appendChild(likeNode);
                        card.classList.add('done');
                    }

                    todoField.appendChild(card);
                })
            }

        } catch (e) {
            console.log(e);
        }

    }

    createTodosList();
    select.addEventListener('change', (e) => {
        const value = e.target.value;
        clearTodoFieldChildren();
        createTodosList(value)
    })

    // TODO end

    // POSTS start

    const postForm = document.getElementById('create-post-form');
    const createPostsList = async () => {
        try {
            showLoadingNotification(postsField);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const posts = await response.json();
            if (posts) {
                clearTodoFieldChildren(postsField);
                posts.forEach((post) => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const cardBody = document.createElement('div');
                    card.classList.add('card-body');

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.innerText = post.title;

                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.innerText = post.body;

                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);

                    card.appendChild(cardBody);

                    postsField.appendChild(card);
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    createPostsList()

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(postForm);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                body: formData,
            })
            if (response.status === 201) {
                const successNotificationNode = document.createElement('div');
                successNotificationNode.innerText = 'Success!';
                postForm.appendChild(successNotificationNode);
                setTimeout(() => {
                    postForm.removeChild(successNotificationNode);
                }, 1500)
            }
        } catch (e) {
            console.log(e)
        }

    })


    // POSTS end
})