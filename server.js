if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')
const sequelize = require('./configs/db.config')

//sequelize.sync({ alter: true })
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const registerRouter = require('./routes/register')
const authorRouter = require('./routes/author')
const bookRouter = require('./routes/book')
const dashboardRouter = require('./routes/dashboard')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'thisissuperdupersession',
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure: true,
      httpOnly: true,
    }
}))
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))

app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/register', registerRouter)
app.use('/author', authorRouter)
app.use('/book', bookRouter)
app.use('/dashboard', dashboardRouter)

app.listen(process.env.PORT)