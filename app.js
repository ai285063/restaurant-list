const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const edited = req.body
  console.log(edited)
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = edited.name
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
