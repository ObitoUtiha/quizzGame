let catchedData;

function culcCurQuestion(number){
    //Ставим предупреждение в заголовок вопроса о возможносте выбора нескольких ответов
    var numberAnswers = document.getElementById('number-answers');
    if(catchedData.questions[number].category_answer == 1){
        numberAnswers.textContent = '(one answer)'
    }
    else{
        numberAnswers.textContent = '(many answers)'
    }
    //Задаём текст вопроса
    var mainQuestionText = document.getElementById('main-question-text');
    mainQuestionText.textContent =  catchedData.questions[number].question;

    //Задаём варианты ответов
    var QuestionList = document.querySelectorAll('.question-text');
    for(let i = 0; i<QuestionList.length; i++)
    {
        QuestionList[i].textContent = QuestionList[i].textContent + " " + catchedData.questions[number].answers[i];
    }
}

//При загрузке страницы принимаем и парсим json с главной, после чего задаём фон + первые вопросы
document.addEventListener('DOMContentLoaded', function() {
    let param1String = localStorage.getItem('param1');
    catchedData = JSON.parse(param1String);
    //console.log(catchedData)
    var img = document.getElementById('main-picture');
    img.src = catchedData.img;
    culcCurQuestion(0);
});

let calcQuestions = 0;
let rightAnswers = 0;



function toggleClass(element) {
    element.classList.toggle('menubtn-checked');
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function setStatus(listQuestions, elementStatus){
    listQuestions.forEach(function(element) {
    element.classList.add(elementStatus);
    });
}

function getToggleElement(element){
    console.clear();
    var overlay = document.getElementById('overlay');
    var toggleElement = document.querySelectorAll('.menubtn-checked');
    if(toggleElement.length > 0)
    {
        var indexSelectedItems = [];
        var QuestionList = document.querySelectorAll('.menubtn');
        for(let i = 0; i<QuestionList.length;i++)
        {
            if(QuestionList[i].classList.contains('menubtn-checked')){
                indexSelectedItems.push(i);
            }
        }

        //console.log(catchedData.questions[calcQuestions].correct_answer.map(element => element-1));
        if(catchedData.questions[calcQuestions].correct_answer.length>1){
            var areEqual = arraysAreEqual(indexSelectedItems, catchedData.questions[calcQuestions].correct_answer.map(element => element-1));
            if(areEqual == false){
                setStatus(toggleElement, 'menubtn-incorrect');
            }
            else{
                setStatus(toggleElement, 'menubtn-correct');
            }
        }
        else{
            console.log(indexSelectedItems);
            console.log(catchedData.questions[calcQuestions].correct_answer);
            if(indexSelectedItems[0] != catchedData.questions[calcQuestions].correct_answer-1)
            {
                setStatus(toggleElement, 'menubtn-incorrect');
            }
            else{
                setStatus(toggleElement, 'menubtn-correct');
            }
        }


        var checkAnswer = document.querySelectorAll('.menubtn-correct');
        if(checkAnswer.length>0){
            rightAnswers++;
        }


        //console.log(toggleElement[i].textContent);

        

        //Выделить корректные ответы
        // var QuestionList = document.querySelectorAll('.menubtn');
        // if(catchedData.questions[calcQuestions].correct_answer.length>1)
        // {
        //     for(let i = 0; i<catchedData.questions[calcQuestions].correct_answer.length; i++)
        //     {
        //         QuestionList[catchedData.questions[calcQuestions].correct_answer[i]-1].classList.add('menubtn-correct');
        //     }
        // }
        // else{
        //     QuestionList[catchedData.questions[calcQuestions].correct_answer-1].classList.add('menubtn-correct');
        // }


        overlay.style.display = 'block';
        //задержка 3 секунды перед сменой вопроса
        var codeExecuted = false;
        setTimeout(function() {
            if (!codeExecuted) {
                console.log('Прошло 3 секунды!');
                toggleElement.forEach(function(element) {
                    element.classList.remove('menubtn-correct', 'menubtn-checked', 'menubtn-incorrect');
                });
                calcQuestions++;
                if(calcQuestions>=catchedData.question_number){
                    localStorage.setItem('param2', rightAnswers);
                    localStorage.setItem('param3', catchedData.question_number);
                    window.location.href = "/src/pages/result.html";
                }
                culcCurQuestion(calcQuestions);
                overlay.style.display = 'none';
            }
        }, 3000);
            //  codeExecuted = true;
    } else {
        return;
    }
}