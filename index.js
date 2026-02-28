
const add = (a,b) => a+b;

const subtract = (a,b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a,b) => a / b;

let num1 = "";
let operator = "";
let num2 ="";
shouldResetDisplay = false;

function operate(operator,a,b){
    return operator(a,b)
}

const container = document.querySelector("#container")
container.style.cssText = "width:500px;height:400px;border:2px solid black;border-radius:5px;display:flex;flex-wrap:wrap;justify-content:space-evenly;gap:30px";

const display = document.createElement("div");
display.style.cssText = "width:500px;height:60px;border:2px solid black; border-radius-top-right:3px;border-radius-top-left:3px;font-size:30px";
display.textContent = "0"
container.appendChild(display)


const keys = [0,1,2,3,4,5,6,7,8,9,"=","*","-","+","/"]

keys.forEach(item =>{
const button = document.createElement("button")
button.style.cssText = "width:50px;height:40px;border:2px solid black;border-radius:5px; font-weight:bold;font-size:25px"

button.textContent = item
container.appendChild(button)

button.addEventListener("click",()=>{
  if(typeof item =="number"){
    updateVariable(item)
  }
  
  else if (item ==="+" || item==="-" ||item ==="*" || item ==="/"){
      handleResult(item)
  }

  else if (item ==="="){
    calculateResult()
  }
})
})

const clearButton = document.createElement("button");
clearButton.style.cssText = "width:50px;height:40px;border:2px solid black;border-radius:5px; font-weight:bold;font-size:15px";
clearButton.textContent = "CLR"
container.appendChild(clearButton)

clearButton.addEventListener("click",()=>{
    display.textContent = "0"
})

function updateVariable(digit){
  if (shouldResetDisplay) {
    display.textContent = "";
    shouldResetDisplay = false;
  }
   if(operator !=="" && num2===""){
    display.textContent = ""
   }
   else if(display.textContent ==="0"){
    display.textContent = ""
   }
   display.textContent += digit;

    if(operator===""){
    num1 = display.textContent
   }
   else{
    num2 = display.textContent
   }
}


function calculateResult(){
  if(num1===""|| operator===""|| num2===""){
    return
  }

 let firstNum = +(num1)
 let secondNum = +(num2)

 if(operator ==="/" && secondNum ===0){
    display.textContent = "Error"

    num1="";
    num2 ="";
    operator ="";
    return
  }

  let result;
  if (operator ==="+"){
    result = operate(add,firstNum,secondNum)
  }
  else if(operator === "-"){
    result = operate(subtract,firstNum,secondNum)
  }
  else if (operator ==="*") {
    result = operate(multiply,firstNum,secondNum)
  }
  else if(operator ==="/"){
    result = operate(divide,firstNum,secondNum)
  }


  result = +(result.toFixed(2))

  display.textContent = result;
  num1 = result.toString();
  num2 = "";
  operator = "";
  shouldResetDisplay = true;
}

function handleResult(newOperator){
 if (num1 !=="" && operator !=="" && num2 !==""){

   calculateResult()
 }
 else if(num1 !=="" && operator ===""){
    num1 = display.textContent;
 }
    operator = newOperator
    
}

const decimalBtn = document.createElement("button");
decimalBtn.style.cssText = "width:50px;height:40px;border:2px solid black;border-radius:5px; font-weight:bold;font-size:25px";
decimalBtn.textContent = "."
container.appendChild(decimalBtn)

decimalBtn.addEventListener("click", ()=>{

  if (shouldResetDisplay){
    display.textContent = "0";
    shouldResetDisplay = false;
  }
  if(!display.textContent.includes(".")){
    display.textContent += "."
  }
  if (operator ==="") {
    num1 = display.textContent
  }
  else{
    num2 = display.textContent
  }
})


const backspaceBtn = document.createElement("button");
backspaceBtn.style.cssText = "width:50px;height:40px;border:2px solid black;border-radius:5px; font-weight:bold;font-size:25px";

backspaceBtn.textContent = "🔙"
container.appendChild(backspaceBtn)

backspaceBtn.addEventListener("click", ()=>{
 display.textContent = display.textContent.slice(0,-1)
 if (display.textContent===""){
  display.textContent = "0"
 }
  if(operator ===""){
    num1= display.textContent
  }
  else{
    num2 = display.textContent
  }
})


document.addEventListener("keydown", (event) => {
    const key = event.key;
    
    // Numbers (0-9)
    if(key >= '0' && key <= '9'){
        updateVariable(parseInt(key));
    }
    // Operators (+, -, *, /)
    else if(key === '+' || key === '-' || key === '*' || key === '/'){
        handleResult(key);
    }
    // Equals (Enter or =)
    else if(key === 'Enter' || key === '='){
        event.preventDefault();
        calculateResult();
    }
    // Decimal point (.)
    else if(key === '.'){
        if(shouldResetDisplay){
            display.textContent = "0";
            shouldResetDisplay = false;
        }
        if(!display.textContent.includes(".")){
            display.textContent += ".";
        }
        if(operator === ""){
            num1 = display.textContent;
        } else {
            num2 = display.textContent;
        }
    }
    // Backspace
    else if(key === 'Backspace'){
        display.textContent = display.textContent.slice(0, -1);
        if(display.textContent === ""){
            display.textContent = "0";
        }
        if(operator === ""){
            num1 = display.textContent;
        } else {
            num2 = display.textContent;
        }
    }
    // Clear (Escape)
    else if(key === 'Escape'){
        display.textContent = "0";
        num1 = "";
        num2 = "";
        operator = "";
        shouldResetDisplay = false;
    }
});