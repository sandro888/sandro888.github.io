let mycar=Car=function(name,color,brand){
    // property
    this.setName = name;
    this.setColor =color;
    this.setBrand=brand;
    // method
    this.save=function(){
        console.log("saving "+ this.setName+ " ,color - "+this.setColor+" ,brand "+ this.setBrand)
    }
}
// funqciis gamodzaxeba
mycar=new Car('jetta','Platinum Gray Metallic','VW')
mycar.save()


