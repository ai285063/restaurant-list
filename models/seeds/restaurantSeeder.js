const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const { results: data } = require('./restaurant.json')

const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  return Promise.all(Array.from(
    { length: SEED_USER.length }, (_, i) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({
          email: SEED_USER[i].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(
            { length: 3 },
            (_, j) => Restaurant.create({ ...data[j + i * 3], userId })
          ))
        })
        .then(() => {
          console.log(`User${i + 1} Seeder done.`)
          if (i === (SEED_USER.length - 1)) {
            console.log('Seeder load done.')
            process.exit()
          }
        })
    }
  ))
})
