const jwt = require('jsonwebtoken')

const generateAccessToken = async (user) => {
    let access_token = await jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.ACCESS_TOKEN_KEY,
        {expiresIn: '20s'}
    )
    return access_token;
}
const generateRefreshToken = async (user) => {
    let refresh_token = await jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.REFRESH_TOKEN_KEY,
        {expiresIn: '365d'}
    )
    return refresh_token
}

module.exports = {
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken      
}