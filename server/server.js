const express = require('express')
const apiRouter = require('./apiRouter').router;

const { sequelize, User, Post } = require('./models')
const models = require('./models')
const user = require('./models/user')
//const cors = require('cors')

const app = express()

/*const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json())

app.use('/api/',apiRouter);

app.listen({ port: 5000}, async () => {
    console.log('server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database connected')
})
    


