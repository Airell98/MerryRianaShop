const { User,ShoppingHistory } = require("../models");
const jwt = require('../helper/jwt');
const jwtGoogle = require('../helper/jwtForGoogle');
const compareSync = require("../helper/compareBcrypt")
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = "706011335996-o1co16npukrba33f5t24cf4vu2404n61.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const PASS = "mamakumama"

class userController {

  static registerUser(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password,
      role: "notAdmin",
    })
      .then((user) => {
        const token = jwt(user);
        res.status(201).json({user, access_token:token});
      })
      .catch((err) => {
        next(err);
      });
  }

  static registerAdmin(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password,
      role: "SuperAdmin",
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAllUsers(req,res,next){
    User.findAll({
      where:{
        role: "notAdmin"
      },
      include:[ShoppingHistory]
    }).then((user)=>{
      res.status(200).json(user)
    }).catch(err=>{
      next(err)
    })
  }

  static loginUser(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        console.log(user);
        if (!user || !compareSync(password, user.password)) {
          next({ name: "Login Error" });
        } else {
          const token = jwt(user);
          res.status(200).json({
            access_token: token,
            email: user.email,
            name: user.name,
            role: user.role
          });
        }
      })
      .catch((er) => {
        next(err);
      });
  }

  static loginAdmin(req,res,next){
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        console.log(user);
        if (!user || !compareSync(password, user.password || user && user.role !== "SuperAdmin")) {
          next({ name: "Admin Unrecognized" });
        } else {
          const token = jwt(user);
          res.status(200).json({
            access_token: token,
            email: user.email,
            name: user.name,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }


  static google_sign_in(req, res, next) {
    let payload = null;
    client
      .verifyIdToken({
        idToken: req.body.access_token,
        audience: CLIENT_ID,
      })
      .then((ticket) => {
        payload = ticket.getPayload();
        return User.findOne({
          where: {
            email: payload.email,
          },
        });
      })
      .then((user) => {
        if (user) {
          let access_token = jwtGoogle(user);
          res.status(200).json({ user, access_token });
        } else {
          User.create({
            email: payload.email,
            password: PASS,
            name: payload.name,
            role: "notAdmin"
          }).then((user) => {
            let access_token = jwtGoogle(user);
            res.status(201).json({ user, access_token });
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }



}

module.exports = userController;
