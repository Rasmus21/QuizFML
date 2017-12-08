
$(document).ready(() => {

    SDK.User.loadNav();

    $("#adminCreate-button").click(() => {

        const newUsername1 = $("#inputNewUsername1").val();
        const newPassword1 = $("#inputNewPassword1").val();
        const firstName1 = $("#inputFirstName1").val();
        const lastName1 = $("#inputLastName1").val();

        SDK.User.createAdmin(newUsername1, newPassword1, firstName1, lastName1, (err, data) => {

            window.alert("Registrering lykkedes - du logges nu ind som admin");
            window.location.href = "my-page.html";

        })
    })
});

