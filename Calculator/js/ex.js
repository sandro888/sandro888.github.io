function Calculator(){
    this["+"] =(a,b)=> a+b
    this["-"] =(a,b)=> a-b
    this.calculate = function (str) {
    let string = str.split(" ")
    // operacias gamovyoft 
    return this[string[1]](Number(string[0]),Number(string[2]))
    } 
    this.addMethod = function (name,func){
        this[name]=func
    }    
}
let calc = new Calculator;

let plus = calc.calculate("8 + 4")
alert(plus);
let minus= calc.calculate("8 - 4")
alert(minus);

let powerCalc =new Calculator;

powerCalc.addMethod("*" ,(a,b)=> a*b)
powerCalc.addMethod("**" ,(a,b)=> a**b)
powerCalc.addMethod("/" ,(a,b)=> a/b)
let mult = powerCalc.calculate("2 * 3")
alert(mult); 
let divide = powerCalc.calculate("2 / 3")
alert(divide); 
let square = powerCalc.calculate("2 ** 3")
alert(square); 
