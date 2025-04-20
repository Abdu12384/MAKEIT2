import { Router } from "express";
import { userController } from "../../di/resolver.js";
export class AdminRoute {
    adminRoute;
    constructor() {
        this.adminRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.adminRoute.get('/users', (req, res) => {
            userController.getAllUsers(req, res);
        });
    }
}
//# sourceMappingURL=adminRoute.js.map