const passport = require("passport");
const passportjwt = require("passport-jwt");
const { ExtractJwt, Strategy } = passportjwt
const userAPI = require('../api/user')

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = "passphrase";
options.passReqToCallback = true;

const userStrategy = new Strategy(options, async function (req, jwt_payload, next) 
{
    if (new Date().getTime() / 1000 > jwt_payload.exp) {
      throw new Error.NotFoundError("Token Expired");
    }
  
    const user = await userAPI.readUser(jwt_payload.id,);
    if (user) {
        req.requestUser = user;
        next(null, user);
    } else {
        console.log('Error')
        next(error, false);
    }
});

passport.use("jwt", userStrategy);
module.exports = passport;