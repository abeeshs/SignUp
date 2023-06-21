const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.users

//varifying user with jwt
const userProtect = async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			//get the token from header
			token = req.headers.authorization.split(' ')[1];
			console.log(token);

			//varify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decoded)

			//get user from the token
			req.user = await User.findOne({ where: { firstname:decoded.firstname } })
			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not authorized');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized ,no token');
	}
};

module.exports=userProtect