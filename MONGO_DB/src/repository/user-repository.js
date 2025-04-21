const User = require('../models/user')
const sendEmail = require('../utils/mailer')
class UserRepository {
    constructor () {

    }

    async create(data) {
        try {
            const verificationcode = Math.floor(100000 + Math.random() * 900000).toString();
            const data1 = {...data, verificationcode};
            const user1 = await User.create(data1);
            await sendEmail(
                user1.email,
                'Verify Your Email',
                `Here is your verification code for verifying email: ${verificationcode}`
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

    async verify(data){
        try {
            const user = await User.findOne({
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