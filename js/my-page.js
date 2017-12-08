$(document).ready(() => {

  SDK.User.loadNav();

$("#adminReg-button").hide();
    if (SDK.Storage.load("type") === 2) {
        $('#adminReg-button').show();
    }
});

