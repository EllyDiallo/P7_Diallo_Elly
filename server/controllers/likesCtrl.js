
const {User,Post, Like} = require('../models');
const user = require('../models/user');
const asyncLib = require('async');

module.exports = {

    likePost: async (req,res) => {

        const uuid = req.params.uuid;
        const postUuid = req.body.postUuid;
        
        asyncLib.waterfall([

            function(callback){
                User.findOne({where: {uuid}})
                    .then(function(userFound) {
                        callback(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({  'unable to find user ' : {uuid}, 'error': {err} });
                    });
            },

            function( userFound, callback){
                Post.findOne({
                where: {uuid: postUuid},
               /* include: [
                    { model: User ,
                      as:'user' ,
                      attributes: ["username","picture","uuid","id"]},
                ]*/})
                    .then(function(postFound) {
                        callback(null, userFound, postFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({  'unable to find  post ': {postUuid}, 'error': {err} });
                    });
            },

            function( userFound, postFound, callback){
                Like.findOne({where: {userId: userFound.id, postId : postFound.id}})
                    .then(function(likeFounded){
                        callback(null, userFound, postFound, likeFounded);
                    })
                    .catch(function(err) {
                        return res.status(500).json({  'unable to find  like ': {postUuid}, "and": {uuid}, 'error': {err} });
                    });
            },
            function( userFound, postFound, likeFounded, callback){
                console.log("likeFoundeeeeeeeeedBefore : " + likeFounded)

                if (likeFounded == null) {
                    Like.create({
                         userId : userFound.id,
                         postId: postFound.id
                     })
                        .then(function(liked){
                            callback(null,likeFounded,liked );
                            console.log("likedddd1 : " + liked);
                        })
                        .catch(function(err) {
                            return res.status(500).json({  'unable to create like ': {postUuid}, "and": {uuid}, 'error': {err} });
                    });
                    postFound.update({likes: postFound.likes + 1 })
                    res.status(200).json('like ajouté ' )

                } else {
                    likeFounded.destroy()
                    .then(function(disliked){
                        callback(null,likeFounded, disliked);
                        console.log("dislikedddd1 : " + disliked)
                    }).catch(function(err) {
                            return res.status(500).json({  'unable to create like ': {postUuid}, "and": {uuid}, 'error': {err} });
                    });
                    postFound.update({likes: postFound.likes - 1 })
                    res.status(200).json({"like supprimé : uuid => ": likeFounded.uuid});
                    
                        
                }
                
                
                
            }
        ],function(liked, disliked, likeFounded){

            console.log("liked2 : " + liked, "dislaked2 : "+ disliked, "likefounded2 : " + likeFounded )
           
        })
               
       
    }

}