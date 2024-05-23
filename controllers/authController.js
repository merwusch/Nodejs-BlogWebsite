const User = require('../models/users')
const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24
const createToken = (id) => {
    jwt.sign({ id }, 'secret key', { expiresIn: maxAge })
}

const login_get = (req, res) => {
    res.render('login', { title: 'Login' })
}

const login_post = (req, res) => {
    const { username, password } = req.body
    try {
        const user = User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/admin')
    } catch (err) {
        console.log(err)
    }
}

const register_get = (req, res) => {
    res.render('register', { title: 'Register' })
}

const register_post = (req, res) => {
    const user = new User(req.body)

    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

    res.send('new user created')
}

module.exports = {
    login_get,
    login_post,
    register_get,
    register_post
}