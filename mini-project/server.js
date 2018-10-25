const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')


const Port = 3000;

//                              PEOPLE


let people = [
    { id: '0101705158' , name: 'sandro', surname: 'akhvlediani',date:'1999-10-02' },
    
];


app.set('views', './views');
app.set('view engine', 'pug');
// app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('index', {})
})


app.post('/', (req, res) => {
    console.log(req.body);
    const obj = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        date: req.body.date
    }


    people.push(obj);
    

    res.render('index', {})

})
app.get('/person', (req, res) => {
    res.render('person', { people })
})
app.get('/persons', (req, res) => {
    res.render('persons', { people })
})
app.post('/person', (req, res) => {
    const obj = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        date: req.body.date
    }


    people.push(obj);
    res.render('person', {people})
})


app.get('/person/:id', (req, res) => {
    const id = Number(req.params.id);
    const your = people.find(your => your.id == id);
    res.render('persons', { your })
})




//                      CARS



let carStuff = [
    { VIN:'1457834', Model:'Q8',firm:'Audi', Number:'UO-898-OU',color:'blue' ,owner:"sandro"}
];


app.get('/carIndex', (req, res) => {
    res.render('carIndex', { carStuff })
})
app.post('/carIndex', (req, res) => {
    console.log(req.body);
    const obje = {
        VIN: req.body.VIN,
        Model: req.body.Model,
        firm: req.body.firm,
        Number: req.body.Number,
        color: req.body.color,
        owner: req.body.owner
    }


    carStuff.push(obje);
    

    res.render('carIndex', {})

})
app.get('/cars', (req, res) => {
    res.render('cars', { carStuff })
})

app.get('/cars/:VIN', (req, res) => {
    const VIN = Number(req.params.VIN);
    const mono = carStuff.find(mono => mono.VIN == VIN);
    res.render('car', { mono })
})
app.get('/search',(req,res) =>{
    // var data= {

    //     Abby: '8845',
    //     David: '8871',
    //     Jim: '8890',
    //     Lewis: '8804',
    //   };
    // var returnLookUp = function(e) {
    //     e.preventDefault();
    //     var getInfo = document.getElementById("thisSearch");
    //     document.getElementById("output").value = data[thisSearch.value];
      
    // }
    // returnLookUp()
    res.render('search',{})
})
app.post('/search', (req,res) =>{
    res.render('search',{})
})

app.listen(Port, () => {
    console.log(`running on port like a boss - ${Port}`)
})
