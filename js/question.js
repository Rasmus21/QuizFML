$(document).ready(() => {

    SDK.User.loadNav();

    const submitQuestion = $("#questionSubmit-button");

    submitQuestion.on("click", () => {

        let questionAndChoices = [];
        let question;
        let choice;
        const quizId = SDK.Storage.load("quizId");
        let choiceAnswer = $("#choiceAnswer").val();

        questionAndChoices.push($("#inputQuestion").val());
        questionAndChoices.push($("#inputChoice1").val());
        questionAndChoices.push($("#inputChoice2").val());
        questionAndChoices.push($("#inputChoice3").val());
        questionAndChoices.push($("#inputChoice4").val());

        question = {
            quizId: quizId,
            questionTitle: questionAndChoices[0]
        };

        SDK.Question.create(question, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
                return alert("400 - error!");
            } else if (err) {
                alert("ERROR is " + err);
            } else {

                console.log(questionAndChoices)
                for(let i = 1; i < questionAndChoices.length; i++) {
                    if(i === choiceAnswer ){
                        choice = {
                            choiceTitle: questionAndChoices[i],
                            answer: 1,
                            questionId: data.questionId
                        };
                    } else {
                        choice = {
                            choiceTitle: questionAndChoices[i],
                            answer: 0,
                            questionId: data.questionId
                        };
                    }

                    SDK.Choice.create(choice, (err, data) => {
                        if (err) {
                            alert("ERROR is " + err);
                        } else {
                            console.log("edomoney -basaga money", data)
                        }
                    })
                }
            }
        })
    })
});

