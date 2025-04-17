const User = require('../models/user')
const sendEmail = require('../utils/mailer')
class UserRepository {
    constructor () {

    }

    async create(data) {
        try {
            const user1 = await User.create(data);
            await sendEmail(
                user1.email,
                'Welcome to our website',
                `You have been registered successfully and here are your credentials ${data.email} and password : ${data.password}`
            )
            return user1;
        } catch (error) {
            console.log('something wrong at repo level');
            throw error;
        }
    }

    async findone(data){
        try {
            const user1 = await User.findOne({email : data.email});
            return user1;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;