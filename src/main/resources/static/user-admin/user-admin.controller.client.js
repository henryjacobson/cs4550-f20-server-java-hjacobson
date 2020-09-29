(function () {
let users = []

const deleteUser = (index) => {
  const user = users[index]
  const userId = user._id
  userService.deleteUser(userId)
    .then(status => {
      users.splice(index, 1)
      renderUsers(users)
    })
}

const createUser = () => {
  const username = $("#usernameFld").val()
  const first = $("#firstNameFld").val()
  const last = $("#lastNameFld").val()
  const role = $("#roleFld").val()
  const newUser = {
    username,
    first,
    last,
    role
  }
  userService.createUser(newUser)
    .then(actualInsertedUser => {
      users.push(actualInsertedUser)
      renderUsers(users)
    })
}

const updateUser = () => {
  if (selectedUserIndex != -1) {
    const updatedFields = {
      username: $("#usernameFld").val(),
      first: $("#firstNameFld").val(),
      last: $("#lastNameFld").val(),
      role: $("#roleFld").val()
    }
    const userId = users[selectedUserIndex]._id
    userService.updateUser(userId, updatedFields)
      .then(status => {
        users[selectedUserIndex] = updatedFields
        renderUsers(users)
      })
  }
}

let selectedUserIndex = -1
const selectUser = (index) => {
  selectedUserIndex = index
  const user = users[index]
  $("#usernameFld").val(user.username)
  $("#firstNameFld").val(user.first)
  $("#lastNameFld").val(user.last)
  $("#roleFld").val(user.role)
}



let $template
let tbody

const renderUsers = (users) => {
  tbody.empty()
  for(let i=0; i<users.length; i++) {
    renderUser(users[i], i)
  }
}

const renderUser = (user, i) => {
  const $clone = $template.clone()
  $clone.removeClass("wbdv-hidden")

  $clone.find(".wbdv-username").html(user.username)
  $clone.find(".wbdv-first-name").html(user.first)
  $clone.find(".wbdv-last-name").html(user.last)
  $clone.find(".wbdv-role").html(user.role)

  $clone
    .find(".wbdv-remove")
    .click(() => deleteUser(i))
  $clone
    .find(".wbdv-select")
    .click(() => selectUser(i))

  tbody.append($clone)
}

const findAllUsers = () => {
  userService.findAllUsers()
    .then(_users => {
      users = _users
      renderUsers(users)
    })
}

const main = () => {
  $template = jQuery(".wbdv-template")
  tbody = $("tbody.wbdv-tbody")
  $(".wbdv-create").click(createUser)
  $(".wbdv-update").click(updateUser)

  findAllUsers()
}

$(main)
})()
