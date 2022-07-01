//Import
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const commentsCtrl = require('./controllers/commentsCtrl')
const auth = require('./middlewares/auth');
const likesCtrl = require('./controllers/likesCtrl');
const multer = require('./middlewares/multer-config');



//Router
exports.router = (function(){
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/user').get(auth,usersCtrl.getUserProfile);
    apiRouter.route('/user/:uuid').put(auth,usersCtrl.updateUserProfile);
    apiRouter.route('/user/logout/:uuid').get(auth,usersCtrl.logout);
    apiRouter.route('/user/delete/:uuid').delete(auth,usersCtrl.deleteUser);
    apiRouter.route('/users').get(usersCtrl.getAllprofiles);
    

    
    apiRouter.route('/messages').get(postsCtrl.listPosts);
    apiRouter.route('/message/delete/:uuid').delete(postsCtrl.deletePost);
    apiRouter.route('/message/new/:uuid').post( multer, postsCtrl.createPost);
    apiRouter.route('/message/update/:uuid').put(multer, postsCtrl.updatePost);


    apiRouter.route('/comment/new/:uuid').post(commentsCtrl.createComment);
    apiRouter.route('/comment/new/:uuid').put(commentsCtrl.updateComment);
    

    apiRouter.route('/like/:uuid').post(likesCtrl.likePost);



    return apiRouter;
})();