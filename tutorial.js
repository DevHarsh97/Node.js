const sum = (num1,num2) => {
    return num1 + num2;
};
const PI = 3.14;
class Math{
    constructor(){
        console.log('Object Created');
    }
}
//console.log(sum(1,1));
//module.exports = sum; //To use this function in other file.

// module.exports.sum = sum;
// module.exports.PI = PI;
// module.exports.Math = Math;

//very difficult to export individual module so insted of that follow this.
module.exports = {sum : sum, PI : PI, Math : Math}