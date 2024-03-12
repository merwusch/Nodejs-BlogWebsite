const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')

const app = express()
app.use(express.urlencoded({ extended: true }))

const dbUrl = 'mongodb+srv://ylmzmerwusch:12345@nodeblog.yszaoqe.mongodb.net/node-blog?retryWrites=true&w=majority&appName=NodeBlog'
mongoose.connect(dbUrl)
    .then((result) => console.log('Bağlantı kuruldu'))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.listen(3000)
app.use(express.static('public'))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/admin', adminRoutes)
app.use('/blog', blogRoutes)

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

//404 kontrolu her zaman en sonda olmalıdır yoksa diğer routelar çalışmaz
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})