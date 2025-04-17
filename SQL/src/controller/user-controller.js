const UserService = require('../services/user-service')
const userservice = new UserService();
const create = async (req, res) => {
    try {
        const response = await userservice.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(200).json({
            data: response,
            success: true,
            message: 'successfully created new user',
            err : {}
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: 'something went wrong',
            success: false,
            err: error
        })
    }
}

const signin = async (req, res) => {
    try{
        const response = await userservice.signin(req.body.email, req.body.password);
        return res.status(200).json({  
            message: 'Successfully signed in',
            data: response,  
            success: true,
            err: {}
        });
    }
    catch (error){
        return res.status(500).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        })
    }
}


module.exports = {
    create,
    signin
}