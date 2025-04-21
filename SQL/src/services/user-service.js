const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/server-config')
const bcrypt = require('bcrypt');
const { response } = require('express');
const sendEmail = require('../utils/mailer')
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log('something wrong at service layer');
            throw {error}
        }
    }

    async signin(email, password) {
        try{
            const user = await this.userRepository.getbyemail(email);
            if(!user){
                throw error;
            }
            console.log(password, user.password);
            const passwordmatch = await this.checkpassword(password, user.password);
    
            if(!passwordmatch){
                console.log('password doesnot match');
                throw{error: 'Incorrect Password'};
            }
            const newjwt = this.createtoken({email:user.email, id: user.id});
            await sendEmail(
                user.email,
                'Welcome to our website',
                'You are successfully logged in',
            )
            return newjwt;
        }
        catch(error){
            console.log(error.name);
            if(error.name == 'AttributesNotFound'){
                throw error;
            }
            console.log('something went wrong in signin');
            throw error;
        }
    }

    async verify(data) {
        try {
            const response = await this.userRepository.verify(data);
            return response;
        } catch (error) {
            console.log('Something wrong at service level');
            throw error;
        }
    }

    createtoken(user){
        try{
            const token = jwt.sign(user, JWT_KEY, { expiresIn: '1h'})
            return token;
        }
        catch (error){
            console.log('something wrong at token layer');
            throw {error};
        }
    }

    verifytoken(token){
        try{
            const response = jwt.verify(token, JWT_KEY);
            return response;
        }
        catch (error) {
            console.log('something wrong at token layer');
            throw {error};
        }
    }

    async checkpassword(userinputpassword, encryptedpassword) {
        try{
            return await bcrypt.compareSync(userinputpassword, encryptedpassword)
        }
        catch(error){
            console.log('something wrong at passwordcheck layer');
            throw {error};
        }
    }
}

module.exports = UserService;