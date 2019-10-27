import CryptoJS from 'crypto-js';

/**
 * Encrypts text and return a hash. Used by mobile and login token
 *
 * @param msg text which will be encrypted
 * @param key secret key
 */
export const getHash = (msg: string, key: string): string => {
	if (!key) key = (msg + msg).substring(0, 13);
	var hash = CryptoJS.HmacSHA256(msg, key);
	return CryptoJS.enc.Base64.stringify(hash);
};

/**
 * Encrypts text and return a hash. Used by password hashing
 *
 * @param msg text which will be encrypted
 * @param key secret key
 */
export const encrypt = (msg: string, key: string): string => {
	var hash = CryptoJS.HmacSHA512(msg, key);
	return CryptoJS.enc.Base64.stringify(hash);
};
