//variables////
var startbtn = document.getElementById("start-btn");
var quizQues = document.getElementById("quizQues");
var question = document.getElementById("ques");
var option = document.getElementsByClassName("options");
var next = document.getElementById("next-btn");
var submit = document.getElementById("sub-btn")
var user = {}
var timeInterval;
//storing questions//

//seetting attribute in options//
for (var i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'select(this)');

}
///start quiz function///

function startquiz(btn) {
    alert("you have only one minute to complete the quiz");
    quizQues.classList.remove("hide")
    startbtn.classList.add("hide");
    next.classList.add("hide");


    changeQuestion();

    timeInterval = setInterval(function () {
        seconds++;
        // to increase the minutes after sixty second
        if ((seconds / 60) == 1) {
            seconds = 0;
            minutes++
        }
        if (minutes == 1) {
            alert("time's up");
            clearInterval(timeInterval);
            cardCont[0].classList.add("hide");
            resultDiv.classList.remove("hide");
            resultName.innerHTML = `Name:${userName.value}`
            cor_btn.innerHTML = correct
            wro_btn.innerHTML = wrong
            tot_score.innerHTML = score
        }
        secondsContainer.innerHTML = String(seconds).padStart(2, '0');
        minutesContainer.innerHTML = String(minutes).padStart(2, '0');
    }, 1000)

}
/// question change function/
var quesNum = document.getElementById("ques-num");

var count = 0
var quesCount = 1
var databaseQuestion = null
function changeQuestion() {
    firebase.database().ref(`questions/${count}`).on("value", (value) => {
        const que = value.val()
        databaseQuestion = que
        question.innerHTML = que.question
        option[0].innerHTML = que.options.a
        option[1].innerHTML = que.options.b
        option[2].innerHTML = que.options.c
        option[3].innerHTML = que.options.d
    })
    quesNum.innerHTML = quesCount + "/5"
    count++
    quesCount++
    for (var i = 0; i < option.length; i++) {
        option[i].classList.remove("wrong");
        option[i].classList.remove("correct")
        option[i].classList.remove("disabled")

    }
    next.classList.add("hide");

}

// getting user name and id//
var userName = document.getElementById("username")
var userEmail = document.getElementById("email")
var cardCont = document.getElementsByClassName("card-cont")
var name_div = document.getElementById("name");
var form = document.getElementById("main")
const loginuser = () => {

    if (userName.value === "" || userEmail.value === "") {
        alert("Please fill the input feilds");
    } else if (!validateEmail(userEmail.value)) {
        alert('enter a valid email')
    } else {
        form.classList.add("hide");
        cardCont[0].classList.remove("hide");
        name_div.innerHTML = `Name: ${userName.value}`
    }
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




///function for getting answers///
var counter = 0
var score = 0
var wrong = 0
var correct = 0



function select(li) {
    if (li.innerHTML == databaseQuestion.answer) {
        li.classList.add("correct")
        score = score + 10
        correct++
        // console.log("chassds")  
    } else {
        li.classList.add("wrong")
        wrong++
    }
    for (let i = 0; i < 4; i++) {
        option[i].classList.add("disabled")

    }
    next.classList.remove("hide");
    counter++


    if (counter == 5) {
        next.classList.add("hide");
        submit.classList.remove("hide")



    }
}
var seconds = 0
var minutes = 0
var secondsContainer = document.getElementById("seconds");
var minutesContainer = document.getElementById("minutes");




//collecting score///

var cor_btn = document.getElementById("correct");
var wro_btn = document.getElementById("wrong");
var tot_score = document.getElementById("Total");
var resultDiv = document.getElementById("resultDiv")
var resultName = document.getElementById("sec-name")
function submitBtn() {
    cardCont[0].classList.add("hide");
    resultDiv.classList.remove("hide");
    resultName.innerHTML = `Name:${userName.value}`
    console.log(cor_btn)
    console.log(wro_btn)
    console.log(tot_score)
    console.log(correct)
    console.log(wrong)
    console.log(score)
    cor_btn.innerHTML = correct
    wro_btn.innerHTML = wrong
    tot_score.innerHTML = score
    clearInterval(timeInterval);
}


