const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const User = require('../database/models/user')
const jwt = require('jsonwebtoken');

/**
 * API to register a user
 * @param {*} reqBody 
 * @returns 
 */
async function register(reqBody) {
    let newUser = new User({
        name: reqBody.name,
        email: reqBody.email
    })

    newUser.password = await bcrypt.hash(reqBody.password, 10)
    try{
        await newUser.save();
    }
    catch(err) {
        return { success: false }
    }
    
    return { success: true }
}

/**
 * API to login a user
 * @param {*} reqBody 
 * @returns 
 */
async function login(reqBody) {
    let user = await User.findOne({email: reqBody.email})
    if (user) {
        const result = user.password && await bcrypt.compare(reqBody.password, user.password);
        if (!result) {
            return { 
                success: false,
                error: "Incorrect Password" 
            };
        }

        // create token data and save user
        const today = new Date();
        let tokenExpiry = new Date(today.setDate(today.getDate() + 1));
        let token = jwt.sign({id: user._id}, "passphrase", {
            expiresIn: "1d"
        })

        await User.updateOne({_id: user._id},
            {
                $set: {
                    token,
                    tokenExpiry
                }
            }
        )

        return {
            success: true
        }

    }
    else {
        return {
            success: false,
            error: "Login Failed"
        };
    }
}


module.exports = {
    login,
    register
}