const readline = require('readline'); //import readline module to reading a datastream, one line at a time.
const rl = readline.createInterface({input : process.stdin,    
                                    output : process.stdout}); //create an interface object 

let num1 = Math.floor((Math.random() * 10) + 1); //generate random numbers from 1 to 10
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = (num1 + num2); 
// console.log(answer);
rl.question(`What is ${ num1 } + ${ num2 } ? \n`, (userInput)=>{
    if(userInput.trim() == answer) //trim() to remove whitespace
    {
        rl.close();
    }
    else
    {
        rl.setPrompt('Incorrect response, Try Again!! \n');
        rl.prompt();
        rl.on('line',(userInput)=>{
            if(userInput.trim() == answer)
            {
                rl.close();
            }
            else
            {
                rl.setPrompt(`Your answer of ${userInput} is incroccet, Try Again!! :  `);
                rl.prompt();
            }
        })
    }
});

rl.on('close',()=>{
    console.log('Correct!!!!');
});

