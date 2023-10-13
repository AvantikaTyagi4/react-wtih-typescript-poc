import LoginModel from "../models/LoginModel";
import http from "../shared/http-common";

const login = (data: LoginModel) => {
    return http.post<LoginModel>("api/auth/signin", data);
};

const AuthService = {
    login
};

export default AuthService;