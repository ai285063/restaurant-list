const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const { keyword } = req.query
  const userId = req.user._id
  const query = new RegExp(keyword.trim(), 'i')
  return Restaurant.find({
    $and: [
      { userId }, { name: query }
    ]
  }).lean()
    .then(results => res.render('index', { restaurants: results, keyword: keyword }))
    .catch(err => console.log(err))
})

module.exports = router
