const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qouting_db', {useNewUrlParser: true});

const QouterSchema = new mongoose.Schema({
  name: String,
  quote: String,
  date : Date
 })
 // create an object to that contains methods for mongoose to interface with MongoDB



 const Qouter = mongoose.model('Qouter', QouterSchema);

app.get('/', (req, res)=>{
  res.render('index');
})

app.get('/quotes', (req, res)=>{
  let myQuotes = [];
  Qouter.find()
    .then(d => {
      myQuotes = d;
      console.log(myQuotes);
      res.render('quotes', {myQuotes : myQuotes})
    });
})

app.post('/new', (req, res) => {
  let qouter = new Qouter();
  qouter.name = req.body.name;
  qouter.quote = req.body.quote;
  qouter.date = Date.now("mm-dd-yyyy");
  qouter.save();
  res.redirect('/quotes');
})

app.get('/delete', (req, res) =>{
  Qouter.deleteMany({})
    .then(r => {
      console.log('removed _____', r);
      res.redirect('/');
    });

})

// app.get('/add', (req, res)=>{
//   let myUser = new User();
//   myUser.name = "zizzo";
//   myUser.age = 15;
//   myUser.save()
//   .then(thing => console.log(`yeah! ${thing}`))
//   res.render('index');
// })

// app.get('/all', (req, res) => {
//   User.find()
//     .then(data => data.forEach((d)=> {console.log(d)} ))
//     res.redirect('/')
// })

// app.get('/', (req, res) => {
//   res.render('index');
// })


app.listen(8000, ()=>{'listen on port 8000'});