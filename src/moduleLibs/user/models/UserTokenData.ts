import { LoginProvider } from "../enums/LoginProvider";

export default class UserTokenData {
	userId: number;
	email: string;
	provider: LoginProvider;
	providerKey: string;
}
