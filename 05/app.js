const apiUrl = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM')
    loadUsers();
}

function loadUsers() {
    const promise = fetchGet(apiUrl);

    promise
        .then(data => insertUsers(data))
        .then(data => addUsers(data))
        .catch(err => console.error(err));
}

function fetchGet(url) {
    return fetch(url)
        .then(resp => {
            if(resp.ok) {
                return resp.json();
            }

            return Promise.reject(resp);
        });
}

function insertUsers(usersList) {
    const ulElement = document.querySelector('.users');
    ulElement.innerHTML = '';
    usersList.forEach(user => {
        const liElement = document.createElement('li');
        liElement.innerText = `${user.firstName} ${user.lastName}`;

        ulElement.appendChild(liElement);
    });
}

function addUsers () {

    const form = document.querySelector('form')
    form.addEventListener('submit', e => {

        e.preventDefault()

        const [name, surname] = e.target.elements
        
        const data = {

            firstName: name.value,
            lastName: surname.value

        }

        const options = {

            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}

        }

        fetch(apiUrl, options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            .finally(loadUsers())

    })

}
