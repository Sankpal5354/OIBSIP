const result = document.getElementById("result");
const historyText = document.getElementById("history");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");

let expression = "";

function appendValue(value){
    expression += value;
    result.value = expression;
}

function clearAll(){
    expression = "";
    result.value = "";
    historyText.innerText = "";
}

function deleteLast(){
    expression = expression.slice(0, -1);
    result.value = expression;
}

function calculate(){
    try{
        if(expression === "") return;

        let finalExpression = expression.replace(/%/g, "/100");

        if(finalExpression.includes("/0")){
            result.value = "Cannot divide by zero";
            expression = "";
            return;
        }

        let answer = eval(finalExpression);

        if(!isFinite(answer)){
            result.value = "Error";
            expression = "";
            return;
        }

        historyText.innerText = expression + " =";
        result.value = answer;

        addHistory(expression + " = " + answer);
        expression = answer.toString();
    }
    catch{
        result.value = "Invalid Input";
        expression = "";
    }
}

function square(){
    if(expression === "") return;

    let num = Number(expression);

    if(isNaN(num)){
        result.value = "Invalid Input";
        expression = "";
        return;
    }

    let answer = num * num;
    addHistory(expression + "² = " + answer);
    result.value = answer;
    expression = answer.toString();
}

function squareRoot(){
    if(expression === "") return;

    let num = Number(expression);

    if(num < 0 || isNaN(num)){
        result.value = "Invalid Input";
        expression = "";
        return;
    }

    let answer = Math.sqrt(num);
    addHistory("√" + expression + " = " + answer);
    result.value = answer;
    expression = answer.toString();
}

function addHistory(item){
    const li = document.createElement("li");
    li.innerText = item;
    historyList.prepend(li);
}

function clearHistory(){
    historyList.innerHTML = "";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeToggle.innerText = "☀️";
        localStorage.setItem("calculatorTheme", "dark");
    }
    else{
        themeToggle.innerText = "🌙";
        localStorage.setItem("calculatorTheme", "light");
    }
});

window.onload = function(){
    if(localStorage.getItem("calculatorTheme") === "dark"){
        document.body.classList.add("dark");
        themeToggle.innerText = "☀️";
    }
};

document.addEventListener("keydown", function(event){
    const key = event.key;

    if(!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)){
        appendValue(key);
    }
    else if(key === "Enter"){
        calculate();
    }
    else if(key === "Backspace"){
        deleteLast();
    }
    else if(key === "Escape"){
        clearAll();
    }
});