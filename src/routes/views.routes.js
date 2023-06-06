import {Router} from 'express'
import { ViewsController } from '../controller/views.controller.js'
import { sessionMiddleware } from '../middleware/session.middleware.js'
import  auth  from '../middleware/auth.middleware.js'



const router = Router()

router.get('/products', auth, ViewsController.getProducts)

router.get('/', sessionMiddleware, (req, res) => {
    res.render('login');
});

router.get('/register', sessionMiddleware, (req, res) => {
    res.render('register');
});

router.get('/profile', auth, async (req, res) => {
    const user = await req.session.user
    res.render('profile', {user} );
});

router.get('/cart',auth, ViewsController.getCart)

router.get('/chat', auth, ViewsController.chat)

router.get('/ticket/:tid', ViewsController.ticket)


export default router