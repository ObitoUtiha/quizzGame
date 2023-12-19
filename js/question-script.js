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
    var img = document.getElementById('main-picture');
    img.src = catchedData.img;
    culcCurQuestion(0);
});

let calcQuestions = 0;
let rightAnswers = 0;



function toggleClass(element) {
    element.classList.toggle('menubtn-checked');
}

function getToggleElement(element){
    console.clear();
    var toggleElement = document.querySelectorAll('.menubtn-checked');
    if(toggleElement.length > 0)
    {
        for(let i = 0; i<toggleElement.length; i++)
        console.log(toggleElement[i].textContent);
    } else {
        element.disabled = true;
        return;
    }
}