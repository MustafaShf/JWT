let express=require('express')
let router=express.Router();
let authController=require('../controllers/auth.controllers')
const requireAuth = require('../middlewares/auth.middlewares');

router.get('/test',(req,res)=>{
    res.send('testing routes')
})

router.get('/signup',authController.signup_get)
router.get('/login',authController.login_get)
router.post('/signup',authController.signup_post)
router.post('/login',authController.login_post)
router.get('/logout',authController.logout_get)
router.get('/home',requireAuth, authController.home_get);

module.exports=router;