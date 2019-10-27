export default class SignInUserResponseModel {
    userId: number;
    emailConfirmed: boolean;
    email: string;
    access_token: string;
    expires_in: number;
    token_type: string;
}