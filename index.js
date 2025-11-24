function add (...num){
  return  num.reduce((acc,curNum) => acc + curNum,0)
}


function subtract (...num) {
    if (num.length === 0) return 0;
  return  num.reduce((acc,curr)=> acc- curr)

}


function multiply (... num) {
  return num.reduce((acc,cur)=> acc * cur,1)
}


function divide (...num) {
    if (num.length===0) return 0
 return num.reduce((acc,cur) =>{
    if (cur ===0) throw new Error("Cannot divide by zero")

        return acc/ cur
 })
}


// Step 2
let a;

let b;

let addition = a + b;

let subtraction = a - b;

let multiplication = a * b;

let division = a / b

// step 3

function operate ( operator,a, b){
    if (operator ==="+"){
        return add(a,b)
    }
   else if (operator ==="-"){
    return subtract(a,b)
   }

   else if (operator ==="*"){
    return multiply(a,b)
   }
   else if (operator === "/"){
    return divide(a,b)
   }
}

console.log(operate("+",6,3));

// step 4: Calculator button

const container = document.querySelector("#button")

const values = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","=", "c"]

values.forEach(val=>{
    const btn = document.createElement("button");
    btn.textContent = val;
    btn.style.backgroundColor = "lightgray";
    btn.style.color= "black"
    btn.style.width="20px"
    btn.style.textAlign = "center"
    btn.style.verticalAlign="middle"
    btn.style.margin = "4px"
    btn.style.marginTop = "10px"

    btn.style.textAlign = "center"
    container.appendChild(btn)
})


const calculatorBody = document.querySelector("#display")
const div = document.createElement("div")
div.style.width = "200px";
div.style.height = "200px"
div.style.backgroundColor="#2E2E2E";

div.style.margin = "auto"
div.style.paddingTop ="10px"
calculatorBody.appendChild(div)



const display = document.createElement("div")
// display.textContent = "0123456789"
display.id = "screen";
display.style.textAlign = "right";
display. style.width= "200px"
display.style.height = "60px"
display.style.backgroundColor = "lightgray"


div.appendChild(display)
div.appendChild(container)


// step 5

let currentNumber = "";
let firstNumber = null;
let operator = null;


function  populate () {
const display = document.querySelector("#screen")
const buttons = document.querySelectorAll("#button button")

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const val = btn.textContent

// Digits or decimal
    if(!isNaN(val) || val ==="."){
      currentNumber +=val;
      display.textContent = currentNumber
    }

    // To clear
    else if(val=== "c"){
      currentNumber = "";
      firstNumber= null;
      operator = null;
      display.textContent ="";
    }
    //Perform calculation
    else if(val === "="){
      if(firstNumber !==null && operator !==null && currentNumber !=="") {
        const result = operate(operator,Number(firstNumber), Number(currentNumber));
        display.textContent = result
        currentNumber = result.toString()
        firstNumber = null;
        operator = null;
      }
    }
    else {
      // For Operator (+,-,*,/)
      if(currentNumber !==""){
        if(firstNumber !== null && operator !==null){
          const result = operate(operator,Number(firstNumber), Number(currentNumber))
          display.textContent = result;
          firstNumber = result.toString()
          currentNumber = ""
        }else {
          firstNumber = currentNumber
          currentNumber = ""
        }
        operator = val
      }
    }
  })
})
}

populate()

// creating backspace button

const backSpaceButton = document.createElement('button')
backSpaceButton.textContent = "⬅️"
backSpaceButton.style.color = "black"
backSpaceButton.style.width = "40px"
backSpaceButton.style.height = "30px"
backSpaceButton.style.backgroundColor = "lightgray"
backSpaceButton.style.display = "flex"
calculatorBody.style.margin= "4px"
container.appendChild(backSpaceButton)

backSpaceButton.addEventListener("click", ()=>{
  if (currentNumber.length > 0){
    currentNumber = currentNumber.slice(0,-1)
    display.textContent = currentNumber
  }
})
