window.addEventListener('DOMContentLoaded', () => {

    const todoField = document.querySelector('.todo-field');
    const postsField = document.querySelector('.posts-field');
    const select = document.getElementById('select');


    const createCard = (title, text) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        card.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerText = text;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(cardBody);

        return card;
    }


    // TODO start
    const showLoadingNotification = (node) => {
        node.innerHTML = 'Loading...'
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
                    const card = createCard(`Пользователь ${todo.userId}`, todo.title);

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
        clearTodoFieldChildren(todoField);
        createTodosList(value)
    })

    // TODO end

    // POSTS start

    const createPostsList = async () => {
        try {
            // showLoadingNotification(postsField);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const posts = await response.json();
            if (posts) {
                clearTodoFieldChildren(postsField);
                posts.forEach((post) => {
                    const card = createCard(post.title, post.body)
                    postsField.appendChild(card);
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    createPostsList()

    // POSTS end

    // POST CREATE start
    const postForm = document.getElementById('create-post-form');
    const submitButton = document.querySelector('.create-post-form__btn');
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(postForm);

        try {
            submitButton.disabled = true;
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
        } finally {
            submitButton.disabled = false;
        }

    })

    // POST CREATE end

    // POST CREATE JSON start

    const jsonForm = document.getElementById('create-post-form-json');
    const jsonFormBtn = document.querySelector('.create-post-form-json__btn');
    const createdPostContainer = document.querySelector('.created-post');


    jsonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(jsonForm);

        const formDataOb = {};
        formData.forEach((value, key) => {
            formDataOb[key] = value;
        });
        const json = JSON.stringify(formDataOb);

        try {
            jsonFormBtn.disabled = true;
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 201) {
                const createdPost = await response.json();

                const card = createCard(createdPost.title, createdPost.body);
                createdPostContainer.appendChild(card);

                const successNotification = document.createElement('div');
                successNotification.innerText = 'Ваш созданный пост!';

                createdPostContainer.appendChild(successNotification);

            }
        } catch (e) {
            console.log(e)
        } finally {
            jsonFormBtn.disabled = false;
        }

    })


    // POST CREATE JSON end


})