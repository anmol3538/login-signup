const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Email and password are required.",
            data: {},
            success: false,
            err: "Email or password missing"
        });
    }
    next();
}

const validateisadminRequest = (req, res, next) => {
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            data: {},
            err: 'user id not given',
            message: "User id is required."
        })
    }
    next();
}
module.exports = {
    validateUserAuth,
    validateisadminRequest
}