const {Users} = require('../models')
const sendEmail = require('../utils/mailer')
const ValidationError = require('../utils/validation-error')
const ClientError = require('../utils/client-error')
const {StatusCodes} = require('http-status-codes');
class UserRepository {
    async create(data) {
        try{
            const verificationcode = Math.floor(100000 + Math.random() * 900000).toString();
            const data1 = {...data, verificationcode};
            const user1 = await Users.create(data1);
            await sendEmail(
                user1.email,
                'Verify Your Email',
                `Here is your verification code for verifying email: ${verificationcode}`
            )
            return user1;
        }
        catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log("something wrong at repository layer")
            throw {error}
        }
    }
    async destroy(useremail){
        try{
            Users.destroy({
                where : {
                    email : useremail
                }
            })
            return true;
        }
        catch (error) {
            console.log("something wrong at repository layer")
            throw {error}
        }
    }

    async getbyemail(usermail){
        try{
            const user = await Users.findOne({
                where: {
                    email: usermail
                }
            })
            if(!user){
                throw new ClientError(
                    'AttributesNotfound',
                    'Invalid email sent in the request',
                    'Please check the email, as there is no record of email',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        }
        catch(error){
            console.log('something wrong in repository layer');
            throw error;
        }
    }


    async verify(data){
            try {
                const user = await Users.findOne({
                    verificationcode: data.code
                })
                if(!user) throw error;
                user.isverified = true;
                user.verificationcode = null;
                console.log(user);
                await user.save();
                return user;
            } catch (error) {
                throw error;
            }
    }

}

module.exports = UserRepository;