const {Router} = require('express')
const router = Router()
const checkUser = require('../middlewares/check') // проверка на чек
const goodModel = require('../models/goodModel')


router.get('/', (req, res)=> {
  res.render('index')
})

router.get('/secret',checkUser, async (req, res) => {
  const seller = req.session.user.id
  const goodsList = await goodModel.find({seller})
  console.log(goodsList, 'YA ZDES');
  res.render('secret', {goodsList}) // гудслист идет в сикрет, чтобы затем выдавать список товаров
})

module.exports = router
