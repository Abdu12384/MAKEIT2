import { Router } from "express";
import { decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
import { authController, blockStatusMiddleware } from "../../di/resolver.js";
export class VendorRoute {
    vendorRoute;
    constructor() {
        this.vendorRoute = Router();
        this.setRoute();
    }
    setRoute() {
        // logout
        this.vendorRoute.post('/vendor/logout', verifyAuth, 
        //  authorizeRole(["vendor"])
        blockStatusMiddleware.checkStatus, (req, res) => {
            authController.logout(req, res);
        });
        this.vendorRoute.post('/vendor/refresh-token', decodeToken, (req, res) => {
            console.log("refreshing Admin", req.body);
            authController.handleTokenRefresh(req, res);
        });
    }
}
//# sourceMappingURL=vendorRoute.js.map