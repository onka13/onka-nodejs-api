/**
 * Api Response Codes
 */
enum ServiceResultCodes {
	InvalidPassword = 12,
	UserLockout = 11,
	UserNotFound = 10,
	Created = 12,
	Updated = 11,
	Deleted = 10,
	InvalidParameter = 1,
	GenericError = -1,
	ServerError = -2,
	NoPermission = -3,
	EmptyModel = -10,
	InvalidModel = -11,
	NotFound = -12,
	TransactionError = -13,
	NewToken = -20,
	RefreshToken = -21,
	LoginUser = -30,
	ForceUpdate = -40,
	DeviceBlocked = -41,
	InvalidRegisterKey = -50,
	InvalidHash = -51,
}

export default ServiceResultCodes;
