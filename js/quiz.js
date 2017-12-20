$(document).ready(() => {


    // $('.courseDiv').slideUp(1).slideDown(1000);
    $('.homeText').slideUp(1).slideDown(1000);

    $('#adminButton').hide();
    $('#userButton').hide();

    const test = SDK.Storage.load("username");
    $('#mainpageDisplayUser').html("Welcome, " + test);

    if (SDK.Storage.load("type") === 2) {
        $('#adminButton').show();
        $('#userButton').show();
    }

    $(".courseButtons button").click((e) => {

        let quiz = {
            courseId: e.currentTarget.getAttribute("data-id"),
            quizTitel: prompt("What is the name of your quiz?")
        };
        SDK.Quiz.create(quiz, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - error!");
            } else if (err) {
                alert("ERROR is " + err);
                return console.log("Bad stuff happened", err)
            } else {
                window.location.href = "AddQuestionsPage.html";

            }
        });
    });

    $('.logoutButton').click((e) => {
        e.preventDefault();
        SDK.User.logOut();

    });
    
});