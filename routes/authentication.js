const express = require('express');
const authenticationAPI = require('../api/authentication')

const router = express.Router();

/**
 * Register a new user
 */
router.post('/register', 
    async (req,res) => {
        const result = await authenticationAPI.register(req.body);
        res.send(result)
})

/**
 * Login a user
 */
router.post('/login', 
    async (req, res) => {
        const result = await authenticationAPI.login(req.body);
        res.send(result)
    }
)

module.exports = router;