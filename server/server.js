const express = require('express')
const apiRouter = require('./apiRouter').router;

const { sequelize, User, Post } = require('./models')
const models = require('./models')
const user = require('./models/user')

const app = express()

app.use(express.json())

app.use('/api/',apiRouter);


app.get('/users', async(req,res)=>{

    try {
        const users = await User.findAll()

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)

        return res.status(500).json({error:'something went wrong'})
    }
})


app.post('/posts', async(req,res)=>{
    const {userUuid, body} = req.body

    try {
        const user = await User.findOne({where: {uuid: userUuid}})

        const post = await Post.create({body, userId: user.id})

        return res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'something went wrong' })
        
    }
})

app.get('/allPosts', async(req,res)=>{

    try {
        const posts = await Post.findAll({
            include: [{ model: User , as:'user' }]})

        return res.status(200).json(posts)
    } catch (error) {
        console.groupCollapsed(error)
        res.status(500).json({error: 'something went wrong' })
    }
})



app.listen({ port: 5000}, async () => {
    console.log('server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database connected')
})
    


