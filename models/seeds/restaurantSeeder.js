const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const { results: data } = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < data.length; i++) {
    const { id, ...rest } = data[i]
    Restaurant.create({ ...rest })
  }
})
