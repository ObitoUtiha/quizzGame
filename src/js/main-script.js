//data-parsing
// function dataParsing()
// {
let data;  
    
fetch('/src/data/questions.json')
    .then(response => response.json())
    .then(parsedData => {
         data = parsedData;
        })
    .catch(error => console.error('Ошибка загрузки и парсинга JSON:', error));
// }

//Функция проверки, какой блок вопросов был выбран
function selectQuestionsBlock(element){
    let selectedBlockData;
    var id = element.id;
    switch(id){
        case 'btn-c':
            localStorage.setItem('param1', JSON.stringify(data.CPlusPlusQuestions));
            window.location.href = "pages/question.html";
            break;
        case 'btn-java':
            localStorage.setItem('param1', JSON.stringify(data.JsQuestions));
            window.location.href = "pages/question.html";
            break;
        case 'btn-python':
            localStorage.setItem('param1', JSON.stringify(data.PythonQuestions));
            window.location.href = "pages/question.html";
            break;
        default:
            console.log('some errors');
            return;    
    }
}


