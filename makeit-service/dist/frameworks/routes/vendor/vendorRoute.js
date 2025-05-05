import { Router } from "express";
import { decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
import { authController, blockStatusMiddleware, userController, serviceController, categoryController } from "../../di/resolver.js";
export class VendorRoute {
    vendorRoute;
    constructor() {
        this.vendorRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.vendorRoute.put("/vendor/details", verifyAuth, 
        // authorizeRole(["vendor"])
        blockStatusMiddleware.checkStatus, (req, res) => {
            userController.updateUserDetails(req, res);
        });
        /** ==========================
         *  Service Management Routes
        * ========================== */
        this.vendorRoute.post("/vendor/service", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            serviceController.addService(req, res);
        });
        this.vendorRoute.get("/vendor/service", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            serviceController.getAllServices(req, res);
        });
        this.vendorRoute.put("/vendor/service/:serviceId", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            serviceController.editService(req, res);
        });
        this.vendorRoute.patch("/vendor/service/:serviceId", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            serviceController.updateServiceStatus(req, res);
        });
        this.vendorRoute.get("/vendor/categories", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            categoryController.getAllCategories(req, res);
        });
        /** ==========================
         *  Session Management Routes
        * ========================== */
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