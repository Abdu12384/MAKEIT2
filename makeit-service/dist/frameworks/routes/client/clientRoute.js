import { Router } from "express";
import { authController, blockStatusMiddleware, userController, serviceController } from "../../di/resolver.js";
import { decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
export class ClientRoute {
    clientRoute;
    constructor() {
        this.clientRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.clientRoute.put("/vendor/details", verifyAuth, 
        // authorizeRole(["client"])
        blockStatusMiddleware.checkStatus, (req, res) => {
            userController.updateUserDetails(req, res);
        });
        /** ==========================
         *  Client Service Management Routes
        * ========================== */
        this.clientRoute.get("/client/services", 
        // verifyAuth,
        // authorizeRole(["client"])
        // blockStatusMiddleware.checkStatus as RequestHandler,
        (req, res) => {
            serviceController.getAllServices(req, res);
        });
        this.clientRoute.get("/client/services/:serviceId", 
        // verifyAuth,
        // blockStatusMiddleware.checkStatus as RequestHandler,
        (req, res) => {
            serviceController.getServiceById(req, res);
        });
        this.clientRoute.put("/client/profile", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            console.log('client profile');
            userController.updateUserDetails(req, res);
        });
        /** ==========================
         *  Client Booking Management Routes
        * ========================== */
        this.clientRoute.post("/client/services/:serviceId/book", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            serviceController.bookService(req, res);
        });
        /** ==========================
         *  Client Session Management Routes
        * ========================== */
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
    }
}
//# sourceMappingURL=clientRoute.js.map