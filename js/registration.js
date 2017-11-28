
$(document).ready(() => {

    SDK.User.loadNav();

    $("#reg-button").click(() => {

        const newUsername = $("#inputNewUsername").val();
        const newPassword = $("#inputNewPassword").val();
        const repeatPassword = $("#inputRepeatPassword").val();
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();

        if ((!newUsername || !newPassword || !repeatPassword || !firstName || !lastName) && newPassword.valueOf() === repeatPassword.valueOf()) {
            SDK.User.create(newUsername, newPassword, firstName, lastName, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("has-error")
                } else {
                    if (err) {
                        console.log("Noget går galt")
                    } else {
                        window.alert("Brugeren er nu registreret - venligst log ind")
                        window.location.href = "login.html";
                    }
                }
            });
        }
    });
});




