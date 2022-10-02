
const JWT = require('jsonwebtoken')
const createError = require('http-errors')
let redis = require('redis');
let redisClient = redis.createClient();
redisClient.connect()
module.exports = verifyAccessToken = (req, res, next) => {
    redisClient.get("user").then((res) => {
    console.log(res, 's');
    if (res) {
      if (!req.headers['authorization']) return next(createError.Unauthorized())
      const authHeader = req.headers['authorization']
      const bearerToken = authHeader.split(' ')
      const token = bearerToken[1]
      JWT.verify(token, "secretkeyappearshere", (err, payload) => {
        if (err) {
          const message =
            err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
          return next(createError.Unauthorized(message))
        }
        req.payload = payload
        next()
      })
    }
  })
}