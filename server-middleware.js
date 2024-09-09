const express = require('express')
const handlebars = require("express-handlebars")
const path = require('path')
const app = express();

// versão antiga
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

 var hbs = handlebars.create({defaultLayout: 'main'});
  app.engine('handlebars', hbs.engine);
//app.set('views', path.join("./views"))
app.set('view engine','handlebars')


app.use((req, res, next) => {
	console.log('Time:', Date.now())

	next()
})

app.use('/users', (req, res, next) => {
	console.log('will run before users route');
	next();
});

app.post('/', (req, res, next) => {
	console.log('POST submitted on the form');
	console.log(req.body);
	res.send('POST!!');
	next();
});


app.get('/', function(req, res, next) {
	console.log('route / called');
      res.render("myform", {layout: false});

});

app.get('/users', function(req, res, next) {
	console.log('route /users called');
	res.send('Hello World! /users');
});

app.listen(3000, () => {
	console.log('app is running');
});
