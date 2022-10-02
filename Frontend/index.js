function userDetails(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const number = event.target.number.value;
    const email = event.target.email.value;
    const obj = {
        name,
        number,
        email
    };
    axios.post("http://localhost:3000/user/add-user", obj)
        .then(response => {
            console.log(response);
            showUser(response.data.newUserDetail);
        })
        .catch(err => {
            document.body.innerHTML += "<h4> Something went Wrong! </h4>"
            console.log(err);
        })

    // localStorage.setItem(obj.email, JSON.stringify(obj));
    // showUser(obj);
};

window.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:3000/user/get-users")
        .then(response => {
            console.log(response);

            for (var i = 0; i < response.data.allUsers.length; i++) {
                showUser(response.data.allUsers[i]);
            }
        })
        .catch(error => {
            console.log(error);
        })
});

function showUser(user) {
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('number').value = '';

    if (localStorage.getItem(user.email) != null) {
        removeUserFromScreen(user.email);
    }

    const parentNode = document.getElementById('userList');
    const childHTML = `<li id=${user.id}> ${user.name} - ${user.email}
                                    <button onclick=deleteUser('${user.id}')> Delete </button>
                                    <button onclick=editUser('${user.email}', '${user.username}', '${user.number}')> Edit </button>
                      </li>`
    parentNode.innerHTML += childHTML;
    console.log(parentNode.innerHTML)
};

function editUser(emailId, name, number, userId) {
    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('number').value = number;
    deleteUser(userId);
}

function deleteUser(userId) {
    axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
        .then(response => {
            removeUserFromScreen(userId);
        })
        .catch(err => {
            console.log(err);
        })
};

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('userList');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}
