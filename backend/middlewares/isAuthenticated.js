const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    next()
  } else {
    next(new Error('authentification failed'))
  }
}

module.exports = { isAuthenticated }
