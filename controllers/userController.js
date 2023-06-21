const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.users


// Create the login  controllers
class LoginController {
    async login(req, res) {
        try {

            // Get the email and password from the request body
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Please enter email and password' })
            }

            // Find the user by email
            const user = await User.findOne({ where: { email } });

            // If the user doesn't exist, return an error
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Compare the password entered by the user to the password stored in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // If the passwords don't match, return an error
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            // Generate a JWT token
            const token = jwt.sign({
                firstName: user.firstName,
            }, process.env.JWT_SECRET, { expiresIn: "1h" });

            // Return the token
            res.json({ token });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'An error occurred during signup' })
        }
    }
}

//crete the signup controller
class SignupController {
    async signup(req, res) {
        try {

            // Get the details from the request body

            const { firstName, lastName, email, password } = req.body

            //validating entered details
            if (!firstName || !lastName || !email || !password) {
                return res.status(401).json({ message: 'All fields are required' })
            }

            //Check if the username already exists
            const userExists = await User.findOne({ where: { email } });

            // If the email already exists, return an error
            if (userExists) {
                return res.status(409).json({ error: "User already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create a new user
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,

            });

            // Return the user
            res.status(200).json(user);
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'An error occurred during signup' });
        }
    }
}

module.exports = {
    LoginController,
    SignupController
}