const router = require('express').Router()  
const authController = require('../controllers/authController')
 
//login route
router.get('/login', authController.login_get)

router.post('/login', authController.login_post)

//register route
router.get('/register', authController.register_get)

router.post('/register', authController.register_post)

//logout route
router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
})

module.exports = router