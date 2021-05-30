const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const { results: data } = require('./restaurant.json')

db.once('open', () => {
  for (let i = 0; i < data.length; i++) {
    const { id, ...rest } = data[i]
    Restaurant.create({ ...rest })
  }
  console.log('done')
})
