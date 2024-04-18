const Users = require("../../models/user.js");
const jwt = require("jsonwebtoken");
const { generateRandomPassword } = require('../../middleware/rendomPassword.js');
const { saveUser } = require("../../services/userService.js");

require('dotenv').config();

signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ status: "401", error: 'Invalid Email' });
        }

        // Compare passwords
        // passwordMatch = await bcrypt.compare(password, user.password);
        passwordMatch = password;

        if (passwordMatch) {
            payload = {
                userId: user._id,
                email: user.email,
                // Add other properties to payload as needed
            };

            // Generate a JWT token
            token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ status: "200", token: token, userId: user._id, data: payload });
        } else {
            res.status(401).json({ status: "401", error: 'Invalid Password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ status: "500", error: 'Something Went Wrong' });
    }

}

signup = async (req, res) => {
    try {
        let response = req.body

        userSignUp(response, apiRes)
    }

    catch (error) {
        console.error('Validation or Signup Error:', error);
        res.status(400).json({ status: 400, error: 'Validation failed or internal error' });
    }
}


async function userSignUp(response, res) {
    try {
        const existingUser = await Users.findOne({ email: response.email });
        if (existingUser) {
            return res.status(400).json({ status: 400, error: 'Email is already in use' });
        }

        if (response.user_type !== "customer") {
            const existingCompany = await Users.findOne({
                $or: [
                    { business_name: response.business_name },
                    { business_email: response.business_email }
                ]
            });

            if (existingCompany) {
                return res.status(400).json({ status: 400, error: 'Business Name or Email is already in use' });
            }
        }

        // Continue with saving the user using the saveUser service
        const savedUser = await saveUser(Users, response, { sendEmail: true });

        return res.status(200).json({
            status: 200,
            data: savedUser,
            message: 'User has been created',
        });
    } catch (error) {
        console.error('User Signup Error:', error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}


module.exports = {
    signIn,
    signup
}