$(document).ready(() => {

//Koden herunder opretter og henter users fra databasen
if (SDK.Storage.load("type") === 2) {
    const userslistpage = $('#userslistpage');

    userslistpage.html("");
    SDK.User.findAll ((err, users) => {
        users.forEach((user) => {

    userslistpage.append(`<tr><td>${user.userId}</td><td>${user.username}</td><td>${user.firstName}</td><td>${user.lastName}</td></tr>`);

            });
        });
    }
});



