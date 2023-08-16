const input = document.querySelector('.inputVal'),
      equation = document.querySelector('.equation'),
      history = document.querySelector('.history'),
      buttons = document.querySelectorAll('.btn');
let newEquation = false;

buttons.forEach(btn => {

    btn.addEventListener('click', () => {

        if(newEquation && btn.value != 'back'){
            // add the previous calculation to the history screen
            history.value += "\n\n" + equation.value + "\n" + input.value;
    
            // Scroll textarea to bottom
            history.scrollTop = history.scrollHeight;
    
            // clear previous input from the screen
            if(btn.value != "back" && btn.value != "." && isNaN(btn.value)){
                equation.value = input.value.slice(2);
            }
            else{
                clearCurrentEquation();
            } 
    
            // reassign classes.
            equation.classList.add('active');
            input.classList.remove('active')
        }
    
        if(btn.value == 'back'){
            if(!newEquation){
                if(equation.value.length <= 1){
                    clearCurrentEquation();
                }
                else{
                    equation.value = equation.value.replace(/.$/,"");
                    calculate()
                }
            }
        }

        else if(btn.value == 'AC'){
            clearAll();
        }

        else if(btn.value == 'C'){
            clearCurrentEquation();
        }
    
        else if(btn.value == '.'){
            if(isNaN(equation.value.slice(-1))){
                equation.value += '0.'
            }
            else{
                equation.value += '.'
            }
        }
    
        else if(btn.value == '='){
            newEquation = true;
            equation.classList.remove('active');
            input.classList.add('active')
        }
    
        else if(isNaN(btn.value) && isNaN(equation.value.slice(-1))){
            equation.value = equation.value.replace(/.$/,btn.value);   
        }
    
        else{
            if(newEquation){
                newEquation = false;
            }
            equation.value += btn.value
        }

        if(equation.value.length > 0){
            calculate();
        }

        if(equation.scrollTop < equation.scrollHeight){
            equation.scrollTop = equation.scrollHeight;
        }
    })
})


function clearAll(){
    clearCurrentEquation();
    history.value = "";
}

function clearCurrentEquation(){
    input.value = "";
    equation.value = "";
}

function calculate(){
    if(isNaN(equation.value.slice(-1))){
        input.value = "= " + eval(equation.value.slice(0,-1));
    }
    else{
        input.value = "= " + parseFloat(eval(equation.value).toFixed(10));
    }
}