import { Router } from "express"
import passport from "passport"
import { HTTP_STATUS, httpError, successResponse } from "../utils/api.utils.js"
import { githubLoginController, loginController, logoutController} from "../controller/session.controller.js";


const router = Router()
//Session routes

router.post('/login',
passport.authenticate('login', {failureRedirect: 'loginerror'}), loginController);

router.post('/register',
passport.authenticate('register',{failureRedirect:'/api/sessions/registererror'} ), async (req, res) => {
    res.send({status: "success", message: "user registered"})
});

router.get('/registererror', async (req, res ) => {
    res.send("Ocurrio un error")
})

//Github
router.get('/github', passport.authenticate('github', { scope: ['user : email'] }))

router.get('/github/callback',
passport.authenticate('github', {failureRedirect: '/github-error'}), githubLoginController)

//Log out
router.get('/logout', logoutController)

export default router