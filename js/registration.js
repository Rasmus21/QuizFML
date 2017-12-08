
$(document).ready(() => {

    SDK.User.loadNav();

    $("#reg-button").click(() => {

        const newUsername = $("#inputNewUsername").val();
        const newPassword = $("#inputNewPassword").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();

        SDK.User.create(newUsername, newPassword, firstName, lastName, (err, data) => {

            window.alert("Registrering lykkedes - du logges nu ind")
            window.location.href = "my-page.html";

        })
    })
});
