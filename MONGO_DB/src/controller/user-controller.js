const UserService = require('../services/user-service')
const userservice = new UserService();

const create = async (req, res) => {
    try {
        const user1 = await userservice.signup(req.body);
        return res.status(200).json({
            message: "User created successfully",
            user: user1,
            success: true,    
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error creating user",
            success: false,
            data: [],
            err: error
        })
    }
}

const signin = async (req, res) => {
    try {
        const user1 = await userservice.signin(req.body);
        return res.status(200).json({
            success: true,
            message: "successfully retrieved the user",
            data: user1,
            err: []
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            data: [],
            err: error,
            success: false,
            message: "could not find the user"
        })
    }
}

const verifyemail = async(req, res) => {
    try {
        const response = await userservice.verify(req.body);
        if(!response){
            return res.status(401).json({
                success: false,
                message: "Email verification failed",
            })
        }
        return res.status(201).json({
            success: true,
            message: "Email verified successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error verifying email",
            success: false,
            err: error
        })
    }
}

module.exports = {
    create,
    signin,
    verifyemail
}