import { Router } from "express";
import { authController } from "../../di/resolver.js";
export class AuthRoute {
    authRoute;
    constructor() {
        this.authRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.authRoute.post('/signup', (req, res) => authController.register(req, res));
        this.authRoute.post('/send-otp', (req, res) => authController.sendOtp(req, res));
        this.authRoute.post('/login', (req, res) => authController.login(req, res));
        this.authRoute.post('/google-auth', (req, res) => authController.authenticateWithGoogle(req, res));
    }
}
//# sourceMappingURL=authRoute.js.map