// For theme 
const themeSelector = document.getElementById("theme-selector")
const bodyEl = document.getElementById("body")
// end for theme

const btnNumbEl= document.querySelectorAll('[data-number]')
const btnOperationEl = document.querySelectorAll('[data-operation]')
const btnEquals = document.getElementById("button-equals")

const btnDelEl = document.getElementById("button-del")
const btnResetEl = document.getElementById("button-reset")
const displayEl = document.getElementById("display")
let numbString =""
let num1 = "";
let num2 = "";
let operation =""
let isOperation = false
let isNum1 = false;
let isPoint = false;
//Number Button Event
for(let i=0; i<btnNumbEl.length;i++){
    btnNumbEl[i].addEventListener("click", function(){
        //check if size of display too long
        if (chkDisplaySize()) return
        
        if (btnNumbEl[i].innerText=="."){
            if (isPoint) return;
            isPoint = true;
        }  
       
        if (isNum1)num2 = num2 + btnNumbEl[i].innerText;
        numbString = numbString+btnNumbEl[i].innerText; 
        displayEl.innerText = numbString
    } )
}
//+ - x / Event
for(let i=0; i<btnOperationEl.length;i++){
    btnOperationEl[i].addEventListener("click", function() {
        
        // check if operation already entered
        if (isOperation) return;
        // check if user pressed operation before entring any number
        if(numbString.length==0) return; 
        //check if theres space on display
        if(chkDisplaySize()) return;

        operation = btnOperationEl[i].innerText
        num1=numbString;
        numbString = numbString+ operation
        displayEl.innerText= numbString
        isOperation=true;
        isNum1=true
        isPoint=false;
        
    })
}

// Equals Button Event
btnEquals.addEventListener("click", function (){
    if (!isOperation) return;
    let result = ""
    switch(operation){
        case '+': 
            result = +num1 + +num2
            break;
        case '-':
            result = num1-num2;
            break;
        case 'x':
            result = num1*num2;
            break;
        case '/':
            result = num1/num2;
    }
    displayEl.innerText=result;
    numbString = result
    isOperation=false;
    operation="";
    num1="";
    isNum1= false;
    num2="";
    isPoint = false;
})


// Reset Button Event
btnResetEl.addEventListener("click", funcReset)
function funcReset(){   
    displayEl.innerText="0"
    numbString = ""
    isOperation=false;
    isNum1=false
    num1=0;
    num2=0;
    chkDisplaySize()
}

// Delete Button Event
btnDelEl.addEventListener("click", funcDel )
function funcDel(){

    numbString=  numbString.toString() //if its result of previous calculation it would have chnge to type number
    if ((numbString.charAt(numbString.length-1) == '+') || 
        (numbString.charAt(numbString.length-1) == '-') || 
        (numbString.charAt(numbString.length-1) == 'x') || 
        (numbString.charAt(numbString.length-1) == '/')) 
        {
            isOperation = false;
            operation =""
            isNum1=false;
            num2=0;
        }

    if (isNum1) num2 = num2.substring(0, num2.length-1);
    
    numbString = numbString.substring(0, numbString.length-1)
    if (numbString.length == 0)displayEl.innerText = "0"
    else displayEl.innerText = numbString
    chkDisplaySize()
}
function chkDisplaySize(){
    let l = displayEl.innerText.length
    displayEl.classList = ""
    if (l<=7) displayEl.classList.add("regular")
    if (l>7) displayEl.classList.add("smaller")
    if (l>10) displayEl.classList.add("smallest")
    if (l>47) return true;

    // errorEl.innerText = "number too big"
    return false;
}

window.addEventListener("keydown", (e) => {
    if (e.code == 'Escape') funcReset()
    else if(e.code == 'Backspace') funcDel()
})

// Theme Selector Event
themeSelector.addEventListener("click", function(){
    let theme = themeSelector.value;
    switch(theme) {
        case '1':
           bodyEl.classList=""
            bodyEl.classList.add("theme1")
            break;
        case '2':
            bodyEl.classList =""
            bodyEl.classList.add("theme2")
            break;
        case '3':
            bodyEl.classList =""
            bodyEl.classList.add("theme3")
      }
     
})
