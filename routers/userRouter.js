const {Router} = require('express') 
const router = Router();
const User = require('../models/userModel')
const Good = require('../models/goodModel')

router.get('/signIn', (req, res)=> {
  res.render('signIn')
})

router.post('/signIn', async (req, res) => {
  const {email, password, nickname} = req.body
  // console.log(req.body);
  if(email && password && nickname) {
    const currentUser = await User.create({
      email, 
      password, 
      nickname
    })
    if (currentUser) {
      // console.log(currentUser);
      req.session.user = { // user - дефолтный синтаксис
        id: currentUser._id
      }
      return res.status(200).redirect('/secret') // все ок
    }
    return res.status(418).redirect('/signIn') 
  }
  return res.status(418).redirect('/signIn') 
})

router.get('/signOut', (req, res) => {
  req.session.destroy(
  (err) => {
    if (err) return res.redirect('/')
  })
  res.clearCookie(req.app.get('cookieName'))
  return res.redirect('/')
})


router.get('/addGood', (req, res) => {
  res.render('addGood')
})

router.post('/addGood', async (req, res) => {
  const {name, description, count, price} = req.body;
  // console.log(req.body);
  const seller = await User.findById(req.session.user.id)
  if(name && count && price) {
    const currentGood = await Good.create({
      name, 
      description,
      count,
      price,
      seller: seller._id
    })
    // console.log(currentGood);
    // console.log(currentGood);
    return res.status(200).redirect('/secret')
  }
  return res.status(418).redirect('/addGood')
})

router.get('/signUp', (req, res)=> {
  res.render('signUp')
})

router.post('/signUp', async(req, res) => {
  const {email, password} = req.body
  if (email && password) {
    const currentUser = await User.findOne({email, password})
    if (currentUser) {
      req.session.user = {
        id: currentUser._id
      }
      return res.status(200).redirect('/secret')
    }
    return res.status(401).redirect('/user/signIn')
  }
  return res.status(401).redirect('/user/signIn')
})
router.get('/editGood/:id', async (req, res) => {
  const goodId = req.params.id
  const currentUser = await Good.findById({_id: goodId})
  res.render('editGood', {currentUser})
})

router.post('/editGood/:id', async (req, res) => {
  // const {name, description, count, price} = req.body;
  // const updatedGood = await Good.findOneAndUpdate({name: req.body.name},
  //   { $set: {name: name, description: description, count: count, price: price}},
  //   {
  //     returnOriginal: false
  //   }
  // )
  // console.log(updatedGood);
  // // const seller = req.session.user.id
  // // const goodsList = await Good.find({seller})
  
  // res.redirect('/secret')
  const updatedGood = await Good.findByIdAndUpdate( req.params.id, req.body)
  res.redirect('/secret')
})

router.get('/catalog', (req, res) => {
  res.render('catalog')
})


module.exports = router;
