//Import
const bcrypt = require("bcrypt");
const jwtUtils = require('../utils/jwt.utils');
const jwt = require('jsonwebtoken');
//const models = require('../models');
const {Post, User} = require('../models');
const auth = require('../middlewares/auth')

const userValidation = require('../validations/validations-user');
const asyncLib = require('async');
const user = require("../models/user");

const JWT_SIGN_TOKEN = 'bienheureuxestceluiquinesaitpasquilestriste';

module.exports = {
    
    register: function(req,res){
        //params
        const {body} = req;

        const {error} = userValidation(body);
        if(error) return res.status(401).json(error.details.map(i => i.message).join(',')+ " pas ok")

        const { email, username, password, bio, picture } = req.body
          

        asyncLib.waterfall([
      function(callback) {
            User.findOne({
          attributes: ['email'],
          where: { email: email }
        })
        .then(function(userFound) {
          callback(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, callback) {
        if (!userFound) {
          bcrypt.hash(password, 10, function( err, bcryptedPassword ) {
            callback(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ err: 'user already exist' });
        }
      },
      function(userFound, bcryptedPassword, callback) {
        const newUser = User.create({
          email: email,
          username: username,
          bio: bio,
          picture: picture,
          password: bcryptedPassword,
          isAdmin: 0
       
         
        })
        .then(function(newUser) {
          callback(newUser);
        })
        .catch(function(err) {
          return (
            res.status(500).json({ 'error': 'cannot add user' }),
            console.log(err)
            );
        });
      }
    ], function(newUser) {
      if (newUser) {
        console.log(newUser.password)
        return res.status(201).json({
          'uuid':newUser.uuid,
          'pseudo':newUser.username
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });
    },
    
    login: function(req,res){
        const {email, password} = req.body;
        
         if(email == null || password == null ){
            res.status(400).json({err : "misssing  parameters"})
        }


        asyncLib.waterfall([
      function(callback) {
            User.findOne({
          where: { email: email }
        })
        .then(function(userFound) {
          callback(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, callback) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            if (errBycrypt){
              return  res.status(404).json({ 'invalid password' : errBycrypt });
            }else{callback(null, userFound, resBycrypt);
            }
            
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, callback) {
        if(resBycrypt) {
          callback(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'userUuid': userFound.uuid,
          'userName': userFound.username,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    }
      );  
    },
    
   getUserProfile  : async (req, res) => {

        /*const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SIGN_TOKEN);
        const uuid = decodedToken.uuid;
    
      const uuid = req.params.uuid;*/
      const uuid = jwtUtils.getUserUuid(req);

      try {
        const user = await User.findOne({
          attributes: ['uuid','username','bio','picture'],
          where: {uuid: uuid}
        })
        return res.json(user)

      } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
        
      }
    },

    getAllprofiles: async (req,res) =>{

    try {
      
      const users = await User.findAll({

        include: [
              { model: Post ,
                as:'posts' ,
                attributes: ["title","content"]},
            ],
            attributes: ["username"]
      })
      return res.json(users)
      
    } catch (error) {

      return res.status(500).json( error + " unable to get aall users")
    }
    },
  updateUserProfile: async (req, res) => {

    const {body} = req;

    const {error} = userValidation(body);
    if(error) return res.status(401).json(error.details.map(i => i.message).join(',')+ " pas ok")

    
    const uuid = req.params.uuid;
    const { bio, picture, username} = req.body;

    try { 

      const userFound = await User.findOne({
        where: {uuid}
      })
      await userFound.update({
              bio: (bio ? bio : userFound.bio),
              picture: (picture ? picture : userFound.picture),
              username: (username ? username: userFound.username )
              
            })
            .then((userModificated) => res.status(200).send(userModificated))
            .catch((err => res.status(500).send({"mess ": err})))
      
    } catch (error) {
       return res.status(500).json( error + " unable to modify user 2")
    }
    
  },
  logout: async (req, res) => {

    
    const uuid = req.params.uuid;


    asyncLib.waterfall([

      function(callback) {
            User.findOne({
          where: { uuid }
        })
        .then(function(userFound) {
          callback(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, callback){
        if(userFound){
          const tokenOut =jwtUtils.killTokenForUser(userFound);
           res.status(200).json({
             "vous avez été déconnecté": userFound.username,
             "token-out": tokenOut

            })
          callback(tokenOut)
        }else{
        return res.status(500).json( 'unable to logout');
      }
      }

    ], function(tokenOut){
       if(tokenOut){
         res.redirect("/");
        
       }

    })

  
  },

  deleteUser: async(req, res) => {
     
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({
          where: {uuid}
        })
        await user.destroy();
        return res.json( "Votre profil a été supprimé")

      } catch (err) {
        console.log(err)
        return res.status(500).json({err: 'Something went wrong'})
        
      }

  }

}
 
    