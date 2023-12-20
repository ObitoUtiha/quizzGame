document.addEventListener('DOMContentLoaded', function() {
    var param2 = localStorage.getItem('param2');
    var param3 = localStorage.getItem('param3');
    var resultText = document.getElementById('result-text');
    resultText.textContent+=`: ${param2} of ${param3}`

    var rightProcent = (param2/param3)*100;
    console.log(rightProcent);

    var img = document.getElementById('result-img');
    if(rightProcent<=25){
        img.src = "../img/completed25.png";
    }
    else if(rightProcent>=80){
        img.src = "../img/completed100.png";
    }
    else{
        img.src = "../img/completed50.png";
    }
    console.log('Параметр 1:', param2);
    console.log('Параметр 2:', param3);
});