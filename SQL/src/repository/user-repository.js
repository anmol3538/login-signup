const {Users} = require('../models')
const sendEmail = require('../utils/mailer')
const ValidationError = require('../utils/validation-error')
const ClientError = require('../utils/client-error')
const {StatusCodes} = require('http-status-codes');
class UserRepository {
    async create(data) {
        try{
            console.log(data);
            const user1 = await Users.create(data);
            await sendEmail(
                user1.email,
                'Welcome to Our Website',
                `Hey! You have successfully created the account. your credentials are email : ${data.email} and pass : ${data.password}`
              );
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

}

module.exports = UserRepository;