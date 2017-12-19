$(document).ready(() => {



  SDK.User.loadNav();

    const currentUser = SDK.User.current();

    const deleteUserButton = $("#deleteUser-button");
    const adminRegButton = $("#adminReg-button");
    const createQuizButton = $("#createQuiz-button");

adminRegButton.hide();
    if (SDK.Storage.load("type") === 2) {
        $('#adminReg-button').show();
    }

createQuizButton.hide();
    if (SDK.Storage.load("type") === 2) {
        $('#createQuiz-button').show();
    }

    deleteUserButton.click (() => {

        const deleteUserId = currentUser.userId;

        if (confirm("Do you wish to delete your user?"))

        {
            SDK.User.delete(deleteUserId, (err) => {


            });

            SDK.User.logOut();

        }
        else {
            alert("User was not deleted!")
        }

    });

});

