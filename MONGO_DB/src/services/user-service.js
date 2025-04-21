const UserRepository = require('../repository/user-repository')
const sendEmail = require('../utils/mailer')
const userrepo = new UserRepository();

class UserService {
    constructor ()  {}

    async signup(data) {
        try {
            const user1 = await userrepo.create(data);
            return user1;
        } catch (error) {
            console.log('Something wrong at service level');
            throw error;
        }
    }

    async signin(data) {
        try {
            const user1 = await userrepo.findone(data);
            await sendEmail(
                data.email,
                "welcome to our website",
                `Hello ${data.email} you have successfully loggged into our website`
            )
            return user1;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async verify(data) {
        try {
            const response = await userrepo.verify(data);
            return response;
        } catch (error) {
            console.log('Something wrong at service level');
            throw error;
        }
    }
}

module.exports = UserService;