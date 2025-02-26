const express = require('express');
const userAPI = require('../api/user')
const passport = require('../modules/passport')

const router = express.Router();

/**
 * Test endpoint to return the requesting users user infomation from the DB bacl
 * However the endpoint is protected by a bearer token
 */
router.get('/read',
    passport.authenticate(["jwt"], { session: false }),
    async (req, res) => {
        res.send(await userAPI.readUser(req.user._id))
    }
)

module.exports = router;