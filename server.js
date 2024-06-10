require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
// const bodyParser = require('body-parser')

const postsRoutes = require('./routes/post.router')
const authRoutes = require('./routes/auth.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//middle ware
app.use(morgan('dev'))
app.use(helmet())

// routes
app.use('/api/v1/posts', postsRoutes)
app.use('/api/v1/auth', authRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})

process.on('SIGINT', () => {
  console.log('Server is disconnect')
})
