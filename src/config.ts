import dotenv from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
	throw new Error("Couldn't find .env file!");
}

export default {
	// is environment production
	isProduction: process.env.NODE_ENV == 'production',
	// server port address
	port: parseInt(process.env.PORT),
	// mobile secret key for jwt token
	jwtMobileKey: process.env.JWT_MOBILE_KEY,
	// user login secret key for jwt token
	jwtUserKey: process.env.JWT_USER_KEY,
	// secret key for user password encryption
	passSecret: process.env.PASS_SECRET,
};
