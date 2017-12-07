$(document).ready(() => {

if (SDK.Storage.load("type") === 2) {
    const userslistbody = $('#userslistbody');

    userslistbody.html("");
    SDK.User.findAll ((err, users) => {
        users.forEach((user) => {

    userslistbody.append(`<tr><td>${user.userId}</td><td>${user.username}</td><td>${user.firstName}</td><td>${user.lastName}</td></tr>`);

            });
        });
    }
});