const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const path = require('path')
const Port = 3000;

//                              PEOPLE



class Person {
    constructor(name, surname, id, date) {
        this.name = name;
        this.surname = surname;
        this.id = id;
        this.date = date;
    }
    infoEdit(name, surname, id, date) {
        this.name = name;
        this.surname = surname;
        this.id = id;
        this.date = date;
    }
}
let people = [
    new Person('sandro', 'akhvlediani', 5678, '02-10-1999'),
    new Person('aldo', 'polis', 3456, '01-14-1994')
];


app.set('views', './views');
app.set('view engine', 'pug');
// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {})
})


app.post('/', (req, res) => {

    const name = req.body.name;
    const surname = req.body.surname;
    const id = parseInt(req.body.id);
    const date = req.body.date;
    for (let person of people) {
        if (person.id === id) {
            return res.send('person with this id already exists')
        }


    }
    const person = new Person(name, surname, id, date);
    people.push(person);
    res.render('index', {})

})
app.get('/person', (req, res) => {
    res.render('person', { people })
})
app.post('/person', (req, res) => {

    const name = req.body.name;
    const surname = req.body.surname;
    const id = req.body.id;
    const date = req.body.date;
    console.log(name, surname, id, date);
    const per = people.find(person => person.id == id);
    per.infoEdit(name, surname, id, date);

    // const person = new Person(name, surname, id, date);
    // people.push(per);
    res.render('person', { people })
})
app.get('/search', (req, res) => {

    res.render('search', {})
})
app.post('/search', (req, res) => {
  
    // if(req.query.search){
    //     const personId = req.query.search;
    //     const pers = people.find(prod => prod.personId == personId);
        
    // }

    res.render('search', {})
    console.log(personId);



    // res.render('search',{})
})


app.get('/person/:id', (req, res) => {
    const id = Number(req.params.id);
    const your = people.find(your => your.id == id);
    res.render('persons', { your })
})
app.get('/persons', (req, res) => {

    res.render('persons', { people })
})





//                      CARS


class car {
    constructor(VIN, Model, firm,number,color,owner) {
        this.VIN = VIN;
        this.Model = Model;
        this.firm = firm;
        this.number = number;
        this.color = color;
        this.owner = owner;
    }
    carEdit(name, Model, firm,number,color,owner) {
        this.name = name;
        this.Model = Model;
        this.firm = firm;
        this.number =number;
        this.color =color;
        this.owner =owner;
    }
}
const carStuff = [
    new car( '1457834',  'Q8', 'Audi','UO-898-OU','blue','sandro' ),
    new car( '3473234',  'Q7', 'Audi','ER-898-HT','black','gio' )
];

app.get('/carIndex', (req, res) => {
    res.render('carIndex', { carStuff })
})
app.post('/carIndex', (req, res) => {
    console.log(req.body);
    const VIN = req.body.VIN;
    const Model = req.body.Model;
    const firm = req.body.firm;
    const number = parseInt(req.body.number);
    
    const color = req.body.color;
    const owner = req.body.owner;
    for (let car of carStuff) {
        if (car.number === number) {
            return res.send('car with this number already exists')
        }
    }
    const cars= new car(VIN, Model, firm, number,color,owner);
    carStuff.push(cars);
    res.render('carIndex', {})

})
app.get('/cars', (req, res) => {
    res.render('cars', { carStuff })
})
app.post('/cars', (req, res) => {
    res.render('cars', { cars })
})


app.get('/cars/:VIN', (req, res) => {
    const VIN =Number(req.params.VIN);
    const mono = carStuff.find(mono => mono.VIN == VIN);
    res.render('car', { mono })
})


app.listen(Port, () => {
    console.log(`running on port like a boss - ${Port}`)
})
