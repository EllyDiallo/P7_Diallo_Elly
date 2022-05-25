//Import
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const commentsCtrl = require('./controllers/commentsCtrl')
const auth = require('./middlewares/auth');



//Router
exports.router = (function(){
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/:uuid').get(auth,usersCtrl.getUserProfile);
    apiRouter.route('/users/:uuid').put(auth,usersCtrl.updateUserProfile);
    apiRouter.route('/users/logout/:uuid').get(auth,usersCtrl.logout);
    apiRouter.route('/users/delete/:uuid').delete(auth,usersCtrl.deleteUser);
    apiRouter.route('/users').get(usersCtrl.getAllprofiles);
    

    apiRouter.route('/message/new/:uuid').post(postsCtrl.createPost);
    apiRouter.route('/messages').get(postsCtrl.listPosts);


    apiRouter.route('/comment/new/:uuid').post(commentsCtrl.createComment);



    return apiRouter;
})();