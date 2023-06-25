import passport from "passport";
import local from "passport-local"
import { UsersService } from "../services/users.service.js";
import {Strategy as GithubStrategy } from 'passport-github2'
import { isValidPassword } from "../utils/api.utils.js";
import ENV from "./env.config.js";

const usersService = new UsersService()
const LocalStrategy = local.Strategy
function initializePassport () {

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        console.log(req.body);
        const { first_name, last_name, email, age } = req.body;
        
        if (!first_name || !last_name || !age || !email || !password) {
          console.log("Missing Fields");
          return done(null, false);
        }
        
        try {
          let user = await usersService.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          
          const payload = {
            first_name,
            last_name,
            email,
            age,
            password
          };
          
          const request = await usersService.createUser(payload);
          return done(null, request);
        } catch (error) {
          return done("Error trying to get the user: " + error);
        }
      }));
      

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try{
            const user = await usersService.findOne({ email: username })
            if(!user) {
                console.log("User doesnt exist")
                return done (null, false)
            }
            if(!isValidPassword(user, password)) return done (null, false)
            console.log("Verificacion realizada")
            return done(null, user)
        } catch (error){
            return done(error)
        }
    }))

    passport.use(new GithubStrategy({
      clientID: ENV.CLIENT_ID,
      clientSecret: ENV.CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/github/callback'
  },
  async (accessToken, refreshToken, profile, done)=> {
      try{
          const userData = profile._json;
          const user = await usersService.findOne({email: userData.email});
          if (!user) {
              const newUser = {
                  first_name: userData.name.split(" ")[0],
                  last_name: userData.name.split(" ")[1],
                  age: userData.age || null,
                  email: userData.email || null,
                  password: null,
                  githubLogin: userData.login 
              }
              const response = await usersService.createUserGithub(newUser)
              done(null, response._doc);
          }else{
              done(null, user)
          }
          
      }
      catch(error){
          done(error);
      }
  }
  ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await usersService.getUserById(id)
        done(null, user)
    })
}

export default initializePassport