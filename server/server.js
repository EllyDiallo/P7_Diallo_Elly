const express = require('express')
const apiRouter = require('./apiRouter').router;

const { sequelize, User, Post } = require('./models')
const models = require('./models')
const user = require('./models/user')

const app = express()

app.use(express.json())

app.use('/api/',apiRouter);

app.listen({ port: 5000}, async () => {
    console.log('server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database connected')
})
    


