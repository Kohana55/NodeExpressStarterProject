const User = require('../database/models/user');

/**
 * Test READ user function to see if passport kicks in
 * @param {*} userid 
 * @returns 
 */
async function readUser(userid) {
    return await User.findOne({_id: userid})
}

module.exports = {
    readUser
}