import { Router } from "express";
import { ClientAuthController } from "../../di/resolver.js";
export class ClientRoute {
    clientRoute;
    constructor() {
        this.clientRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.clientRoute.post('/signup', (req, res) => ClientAuthController.register(req, res));
        this.clientRoute.post('/send-otp', (req, res) => ClientAuthController.sendOtp(req, res));
        this.clientRoute.post('/login', (req, res) => ClientAuthController.login(req, res));
    }
}
//# sourceMappingURL=clientRoute.js.map