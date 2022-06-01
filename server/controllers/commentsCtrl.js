const {User,Post, Comment} = require('../models');





module.exports = {
    createComment: async (req,res) => {

        const uuid = req.params.uuid;
        const postUuid = req.body.postUuid;
        const { text } = req.body;

       try {

            const user = await User.findOne({where: {uuid}})

            const post = await Post.findOne({
                where: {uuid: postUuid},
                include: [
                    { model: User ,
                      as:'user' ,
                      attributes: ["username","picture","uuid","id"]},
                ]})
            
            const comment = await Comment.create({
                 text,
                 userId: post.user.id,
                 postId: post.id 
                })
                return res.status(200).json({
                    "uuid": comment.uuid,
                    "post-title": post.title,
                    "post-username" : post.user.username,
                    "comment-username": user.username,
                    'comment': comment.text
                })
       } catch (error) {
        
        console.log(error)
        res.status(500).json({error: 'something went wrong' })

       }

       
    
    },

    updateComment: async (req,res) => {

    }
        
}


