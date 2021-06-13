const express = require('express')
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan')
const hbs = require('hbs')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const indexRouter = require('./routers/indexRouter')
const userRouter = require('./routers/userRouter')


app.set('view engine', 'hbs') // подключаем хбс
app.set('views', path.join(__dirname, 'views')) // подключаем хбс
hbs.registerPartials(path.join(__dirname, 'views', 'partials')) // нужен для подключения хедера и футера на все страницы

app.set('cookieName', 'imyaCookie')
const secretKey = 'Qwerty'
app.use(session({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false, //не сохр сессию, если мы ее не изменим
  saveUninitialized: false, //не сохраниять пустую сессию
  store: MongoStore.create({  // хранить сессию в монго
    mongoUrl: 'mongodb://localhost:27017/homework_2004', // имя такое же как в монго
  }),
  cookie: { //настройки для куки. куки создаются  через сессию
    httpOnly: true, //запрещаем изменять куки with JS
    maxAge: 86400 * 1e3, //время жизни куки
  },
}))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public'))) // подключили статику
app.use(logger('dev'))

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(3001, () => {
  console.log('Server gazanool');
  mongoose.connect('mongodb://localhost:27017/homework_2004', {
  useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }, console.log('mongoose started'))
})
