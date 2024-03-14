window.addEventListener('DOMContentLoaded', () => {

    const todoField = document.querySelector('.todo-field');
    const select = document.getElementById('select');

    const showLoadingNotification = () => {
        todoField.innerText = 'Loading...'
    }

    const clearTodoFieldChildren = () => {
        todoField.innerHTML = '';
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
            showLoadingNotification();
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
            const todos = await response.json();
            if (todos) {
                clearTodoFieldChildren();
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

})