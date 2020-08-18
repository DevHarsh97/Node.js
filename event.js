const Events = require('events'); // Import event module.
const eventEmitter = new Events.EventEmitter(); //Object created eventEmitter to access all event properties and methods.

//Assign the event
eventEmitter.on('button', () => { //button -> is an event and when it trigger this function run and display this output.
    console.log("Button event has occurred");
});

//Fire the event
eventEmitter.emit('button');

// Trigger another event with perameters.
//Assign the event
eventEmitter.on('sum', (num1,num2) => { 
    console.log(num1 + num2);
});

//Fire the event
eventEmitter.emit('sum',10,20);