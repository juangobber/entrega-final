import UserModel from "../models/schemas/user.model.js";
import { UsersService } from "../services/users.service.js";
import { HTTP_STATUS, hashPassword, httpError, isValidPassword } from "../utils/api.utils.js";


const usersService = new UsersService()


export const loginController = async (req, res, next) => {
    try {const { email } = req.body;

    const user = await UserModel.findOne({ email });
    let userInfo
    if (!user) {
      console.log('user not found');
      return res.redirect('/');
    }
    
    //Actualizar la hora y fecha de login
    const actualDate = new Date()
    const filter = {_id: user._id}
    const update = {lastLogin: actualDate }
    const updateLoginDate = await UserModel.findOneAndUpdate(filter, update)

    userInfo = {
        _id: user._id,
        first_name: user.first_name,
        age: user.age,
        email: user.email,
        cart: user.cart,
        admin: user.email.includes('@coder.com'),
        role: user.role,
        premium: user.role == 'PREMIUM',
        githubLogin : user.githubLogin ?? null
      }

    req.session.user = userInfo;

    req.session.save(err => {
      if (err) console.log('session error => ', err);
      else res.redirect('/profile');
    });
    console.log("Informacion del usuario que abrió sesion: ", userInfo)
    console.log("informacion de la sesion", req.session)
    } catch (error){
        next(error)
    }
  };

  export const githubLoginController = async (req, res, next) => {
    try{
      const sessionUser = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      githubLogin: req.user.githubLogin,
      cart: req.user.cart
    };

    console.log("req user:", req.user )
    req.session.user = sessionUser
    res.redirect('/profile')

  } catch (error) {
    next(error)
  }
    

  }


export const logoutController = (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      }
      else {
        res.clearCookie('start-solo');
        res.redirect('/');
      }
    })
  };

  