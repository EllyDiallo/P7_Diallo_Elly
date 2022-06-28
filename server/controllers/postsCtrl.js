//const models = require('../models');
const {User,Post} = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const messageValidation = require('../validations/validation-message');
const multer = require('multer');
const path = require('path');

// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;


module.exports = {
    createPost:  async (req,res) => {

    const uuid = req.params.uuid;
        
    const { title, content, likes} = req.body

    try {
        const user = await User.findOne({where: {uuid}})

        const post = await Post.create({ 
          title,
          content, 
          likes,
          userId: user.id,
          attachment: req.file.path
        })

        return res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'something went wrong' })
        
    }
    },
    listPosts: async (req, res) => {
        try {
        const posts = await Post.findAll({
            include: [
              { model: User ,
                as:'user' ,
                attributes: ["username","picture","uuid"]},
            ]
        }
        )
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'something went wrong' })
    }
  },
  deletePost: async(req, res) => {
     
    const uuid = req.params.uuid;

    try {
        const post = await Post.findOne({
          where: {uuid}
        })
        
        await post.destroy();
        return res.json( "Votre post a été supprimé") 
        
      } catch (err) {
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
        
      }

  }
}