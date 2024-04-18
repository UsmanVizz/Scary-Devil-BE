const User = require('./../models/user.js');
const bcrypt = require('bcrypt');
const { sendEmail } = require('./sendEmail.js');
const { generateRandomPassword } = require('../middleware/rendomPassword.js');

saveUser = async (Model, userData, options = {}) => {
    try {
        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 8);


        console.log("hashedPassword", hashedPassword)
        let newUser = new Model({

            email: userData.email,
            password: hashedPassword,
        });



        const username = userData.email ? userData.email : "";
        const userpassword = randomPassword ? randomPassword : "";
        const savedUser = await newUser.save();

        if (options.sendEmail) {
            setTimeout(() => {
                // sendEmail(userData.email, 'signUp', { username: userData?.email, userpassword: randomPassword });
            }, 3000);
        }

        return savedUser;
    } catch (error) {
        console.error('Save User Error:', error);
        throw new Error('Internal Server Error during user creation');
    }
};


module.exports = {
    saveUser,

};
