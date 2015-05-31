var displayNumber = 0;
var resultShown = true; //Anything entered will replace display
var decimalPointPlaced = false;
var stack = [];


function updateDisplay(){
    console.log("Display updated to " + displayNumber);
    document.getElementById("display").value = displayNumber;
}

//event handlers, wait until DOM is fully loaded
window.addEventListener('load',function(){
    document.getElementById("clearButton").addEventListener("click", function(){
        stack = [];
        displayNumber = 0;
        resultShown = false;
        updateDisplay();
        decimalPointPlaced = false;
    });
    
    //note that once an item is pushed, it can't be modified, though it may
    //be displayed, in the case of results.
    document.getElementById("pushButton").addEventListener("click", function(){
       stack.push(parseFloat(displayNumber));
       console.log(parseFloat(displayNumber) + " pushed to stack");
       displayNumber = 0;
       updateDisplay();
       resultShown = false;
       decimalPointPlaced = false;
    });
    
    //flips sign
    document.getElementById("flipSignButton").addEventListener("click", function(){
        //to check if there is a decimal point but no number to the left of it
        if (displayNumber === 0 || resultShown){ 
                displayNumber = 0; 
                resultShown = false;
                console.log("Can't flip the sign of that number! That is probably a displayed result");
        }
        else{
            if (parseInt(displayNumber) === parseFloat(displayNumber) && decimalPointPlaced){
                displayNumber = (parseFloat(displayNumber) * -1) + ".";
            }
            else{
                displayNumber = parseFloat(displayNumber) * -1;
            }
        }
       updateDisplay();
    });
    
    document.getElementById("decimalButton").addEventListener("click", function(){
        if (!decimalPointPlaced){
            if (displayNumber === 0 || resultShown){ 
                displayNumber = ""; 
                resultShown = false;
            }
            
            displayNumber = displayNumber + ".";
            decimalPointPlaced = true;
            updateDisplay();
        }
        else{
            console.log("Decimal Point was already placed");
        }
    });
    
    //arithmetic operators
    document.getElementById("additionButton").addEventListener("click", function(){
        if (stack.length < 2){
            console.log("Stack length is too small, it must be at least two");
        }
        else{
            var num1 = stack.pop();
            var num2 = stack.pop();
            
            console.log(num2 + " + " + num1);
            displayNumber = num2 + num1;
            updateDisplay();
            stack.push(displayNumber);
            console.log(parseFloat(displayNumber) + " pushed to stack");
            resultShown = true;
        }
    });
    
    document.getElementById("subtractionButton").addEventListener("click", function(){
        if (stack.length < 2){
            console.log("Stack length is too small, it must be at least two");
        }
        else{
            var num1 = stack.pop();
            var num2 = stack.pop();
            
            console.log(num2 + " - " + num1);
            displayNumber = num2 - num1;
            updateDisplay();
            stack.push(displayNumber);
            console.log(parseFloat(displayNumber) + " pushed to stack");
            resultShown = true;
        }
    });
    
    document.getElementById("multiplicationButton").addEventListener("click", function(){
        if (stack.length < 2){
            console.log("Stack length is too small, it must be at least two");
        }
        else{
            var num1 = stack.pop();
            var num2 = stack.pop();
            
            console.log(num2 + " * " + num1);
            displayNumber = num2 * num1;
            updateDisplay();
            stack.push(displayNumber);
            console.log(parseFloat(displayNumber) + " pushed to stack");
            resultShown = true;
        }
    });
    
    document.getElementById("divisionButton").addEventListener("click", function(){
        if (stack.length < 2){
            console.log("Stack length is too small, it must be at least two");
        }
        else{
            var num1 = stack.pop();
            var num2 = stack.pop();
            
            console.log(num2 + " / " + num1);
            if (num1 === 0){
                console.log("Cannot divide by zero!");
            }
            else{
                displayNumber = num2 / num1;
                updateDisplay();
                stack.push(displayNumber);
                console.log(parseFloat(displayNumber) + " pushed to stack");
                resultShown = true;
            }
        }
    });
    
    document.getElementById("9").addEventListener("click", function(){
       if (displayNumber === 0 || resultShown){ 
           displayNumber = ""; 
           resultShown = false;
       }
           
       displayNumber += "9";
       updateDisplay();
    });
    document.getElementById("8").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "8";
       updateDisplay();
    });
    document.getElementById("7").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "7";
       updateDisplay();
    });
    document.getElementById("6").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "6";
       updateDisplay();
    });
    document.getElementById("5").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "5";
       updateDisplay();
    });
    document.getElementById("4").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "4";
       updateDisplay();
    });
    document.getElementById("3").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "3";
       updateDisplay();
    });
    document.getElementById("2").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "2";
       updateDisplay();
    });
    document.getElementById("1").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "1";
       updateDisplay();
    });
    document.getElementById("0").addEventListener("click", function(){
        if (displayNumber === 0 || resultShown){ 
            displayNumber = "";
            resultShown = false;
        }
       displayNumber += "0";
       updateDisplay();
    });
});