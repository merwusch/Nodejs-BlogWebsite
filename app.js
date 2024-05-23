const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Blog = require('./models/blogs')
const User = require('./models/users')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const {requireAuth} = require('./middlewares/authMiddleware')

const app = express()
app.use(express.urlencoded({ extended: true })) //true olduğunda iç içe objeleri de okur

const dbUrl = 'mongodb+srv://ylmzmerwusch:12345@dbdepot.or5bvxu.mongodb.net/node-blog?retryWrites=true&w=majority&appName=DbDepot';

mongoose.connect(dbUrl)
    .then((result) => console.log('Bağlantı kuruldu'))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.listen(3000)
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/', authRoutes)
app.use('/blog', blogRoutes)
app.use('/admin', requireAuth, adminRoutes)

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

//404 kontrolu her zaman en sonda olmalıdır yoksa diğer routelar çalışmaz
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})