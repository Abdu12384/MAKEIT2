import { Router } from "express";
import { ClientAuthController } from "../../di/resolver.js";
export class AuthRoute {
    authRoute;
    constructor() {
        this.authRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.authRoute.post('/signup', (req, res) => ClientAuthController.register(req, res));
        this.authRoute.post('/send-otp', (req, res) => ClientAuthController.sendOtp(req, res));
        this.authRoute.post('/login', (req, res) => ClientAuthController.login(req, res));
        this.authRoute.post('/google-auth', (req, res) => ClientAuthController.authenticateWithGoogle(req, res));
    }
}
//# sourceMappingURL=authRoute.js.map