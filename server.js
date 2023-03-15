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
const path = require('path')

//sequelize.sync({ alter: true })
const indexRouter = require('./routes')
const dashboardRouter = require('./routes/dashboard/index.route')
const dashboardUserRouter = require('./routes/dashboard/user.route')
const dashboardRoleRouter = require('./routes/dashboard/role.route')
const dashboardPermissionRouter = require('./routes/dashboard/permission.route')
const dashboardAuthorRouter = require('./routes/dashboard/author.route')
const dashboardCategoryRouter = require('./routes/dashboard/category.route')
const dashboardBookRouter = require('./routes/dashboard/book.route')

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
app.use('/dashboard', dashboardRouter)
app.use('/dashboard/account/user', dashboardUserRouter)
app.use('/dashboard/account/role', dashboardRoleRouter)
app.use('/dashboard/account/permission', dashboardPermissionRouter)
app.use('/dashboard/book/author', dashboardAuthorRouter)
app.use('/dashboard/book/category', dashboardCategoryRouter)
app.use('/dashboard/book/book', dashboardBookRouter)

app.listen(process.env.PORT)