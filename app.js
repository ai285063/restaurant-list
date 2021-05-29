const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./models/seeds/restaurant.json')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params
  const restaurant = restaurantList.results.filter(
    restaurant => restaurant.id == req.params.id
  )
  res.render('show', { restaurant: restaurant[0] })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
