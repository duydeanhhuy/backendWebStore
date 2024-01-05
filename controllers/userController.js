import userServices from "../services/userServices"

const createUser = async (req, res) => {
    let data = req.body
    let response = await userServices.createUserServices(data)
    return res.status(200).json(response)
}
const loginAccount = async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let response = await userServices.loginServices(email,password,res)
    return res.status(200).json(response)
} 
module.exports = {
  createUser: createUser,
  loginAccount: loginAccount
}
