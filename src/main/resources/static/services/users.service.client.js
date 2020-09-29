const url = 'https://wbdv-generic-server.herokuapp.com/api/hjacobson/users';

const userService = {
  findAllUsers: () =>
    fetch(url)
      .then(response => response.json()),
  deleteUser: (userId) =>
    fetch(url + "/" + userId, {
      method: "DELETE"
    })
      .then(response => response.json()),
  createUser: (user) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json()),
  updateUser: (userId, updatedUser) =>
    fetch(`${url}/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
}
