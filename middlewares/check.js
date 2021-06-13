// проверка на залогированность
async function checkUser (req, res, next) {
  if (req.session.user) { 
    res.locals.login = req.session.user // создаем локальную переменную Login для хедера. Внутрь можно положить что угодно
    return next()
  }
  res.redirect('/user/signIn')
}

module.exports = checkUser
