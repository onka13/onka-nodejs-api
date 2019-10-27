import jwt from 'jsonwebtoken';
import config from '../../config';

/**
 * JWT Manager
 */
class JwtManager {
	mobileSecret = config.jwtMobileKey;
	userSecret = config.jwtUserKey;
	/**
	 * Creates a jwt token
	 *
	 * @param key secret key
	 * @param data json data will be embeded in token
	 * @param expiresIn expiration '60', '2 days', '10h', '7d'. default is '7d'
	 */
	createToken(key: string, data: object, expiresIn = null): Promise<string> {
		return new Promise((resolve, reject) => {
			jwt.sign(
				data,
				key,
				{
					expiresIn: expiresIn || '7d',
					algorithm: 'HS256',
				},
				function(err, token) {
					console.log(token);
					if (err) return reject(err);
					resolve(token);
				},
			);
		});
	}
	/**
	 * Validate a jwt token
	 *
	 * @param key secret key
	 * @param token jwt token
	 *
	 * @returns { TokenExpiredError | JsonWebTokenError | NotBeforeError }
	 */
	verifyToken(key: string, token: string) : Promise<any> {
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				key,
				{
					algorithms: ['HS256'],
				},
				function(err, decoded) {
					console.log(token);
					if (err) return resolve();
					resolve(decoded);
				},
			);
		});
	}
}

export default new JwtManager();
