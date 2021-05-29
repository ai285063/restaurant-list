const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const restaurantList = require('./models/seeds/restaurant.json')
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(Object.assign(newRestaurant))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.filter(
    restaurant => restaurant.id === req.params.id
  )
  res.render('show', { restaurant: restaurant[0] })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
