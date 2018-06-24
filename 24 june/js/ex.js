function Calculator(){
    this["+"] = (a,b)  => a+b
    this["-"] = (a,b)  => a-b
    this.calculate = function (str) {
    let string = str.split(" ")
    // operacias gamovyoft 
    //+ davuwere radgan ubralod chasmis shemtxvevashi mimatebas ar asrulebda 
    return this[string[1]](+string[0],+string[2])
    } 
    this.addMethod = function (name,func){
        this[name]=func
    }    
}
var calc = new Calculator;

let add = calc.calculate("2 + 3");
alert(add);
let subt= calc.calculate("2 - 3");
alert(subt);

let powerCalc =new Calculator;

powerCalc.addMethod("*" ,(a, b) => a*b)
powerCalc.addMethod("**" ,(a, b) => a**b)
powerCalc.addMethod("/" ,(a, b) => a/b)
let mult = powerCalc.calculate("2 * 3");
alert(mult); 
let divide = powerCalc.calculate("2 / 3");
alert(divide); 
let square = powerCalc.calculate("2 ** 3");
alert(square); 
