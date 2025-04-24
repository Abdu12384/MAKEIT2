import { Router } from "express";
import { authController, blockStatusMiddleware } from "../../di/resolver.js";
import { decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
export class ClientRoute {
    clientRoute;
    constructor() {
        this.clientRoute = Router();
        this.setRoute();
    }
    setRoute() {
        // logout
        this.clientRoute.post('/client/logout', verifyAuth, 
        // authorizeRole(["client"])
        blockStatusMiddleware.checkStatus, (req, res) => {
            authController.logout(req, res);
        });
        this.clientRoute.post("/client/refresh-token", decodeToken, (req, res) => {
            console.log("refreshing client", req.body);
            authController.handleTokenRefresh(req, res);
        });
        this.clientRoute.post('/client/refresh-token', decodeToken, (req, res) => {
            console.log("refreshing Admin", req.body);
            authController.handleTokenRefresh(req, res);
        });
    }
}
//# sourceMappingURL=clientRoute.js.map