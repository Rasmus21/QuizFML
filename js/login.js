$(document).ready(() => {

  SDK.User.loadNav();

  $("#login-button").click(() => {

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.login(username, password, (err, data) => {
       if (!username || !password) {
           alert("You cannot login without entering any information")
       }
       else if(err && err.xhr.status === 401) {
            $(".form-group").addClass("has-error");
      } else if (err) {
           console.log("Something went wrong");
           alert("You have entered wrong username or password.");
           $("#inputUsername").val("");
           $("#inputPassword").val("");
      } else {
          window.alert("Login var succesfuld :-)");
          window.location.href = "my-page.html";
      }

    });

  });

});
