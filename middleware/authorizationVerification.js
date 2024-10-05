const jwt = require('jsonwebtoken')

const authorizationVerification = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null
  let decodedToken

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    if (token !== null) {
      decodedToken = jwt.verify(token, process.env.SECRETKEY)
    }
    req.userId = decodedToken.id
    req.userRole = decodedToken.rol
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'authorization required, token has expired' })
    }
    if (!token || !decodedToken) {
      return res.status(401).json({ error: 'authorization is required, token missing or invalid' })
    }
  }
}

module.exports = authorizationVerification
