import { Router } from "express";
import { authController, blockStatusMiddleware, userController, vendorController } from "../../di/resolver.js";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
export class AdminRoute {
    adminRoute;
    constructor() {
        this.adminRoute = Router();
        this.setRoute();
    }
    setRoute() {
        /** =========================
         *  User Management Routes
         * ========================= */
        this.adminRoute.get('/admin/users', verifyAuth, authorizeRole(['admin']), (req, res) => {
            userController.getAllUsers(req, res);
        });
        this.adminRoute.patch('/admin/user/status', verifyAuth, authorizeRole(['admin']), (req, res) => {
            userController.updateUserStatus(req, res);
        });
        /** ==========================
            *  Vendor Management Routes
           * ========================== */
        this.adminRoute.get("/admin/vendors", verifyAuth, authorizeRole(['admin']), (req, res) => {
            vendorController.getAllVendors(req, res);
        });
        this.adminRoute.put('/admin/vendor/:vendorId', verifyAuth, authorizeRole(['admin']), (req, res) => {
            vendorController.updateVendorStatus(req, res);
        });
        /** ==========================
         *  Session  Routes
        * ========================== */
        this.adminRoute.post('/admin/refresh-token', decodeToken, (req, res) => {
            console.log("refreshing Admin", req.body);
            authController.handleTokenRefresh(req, res);
        });
        this.adminRoute.get("/admin/refresh-session", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            userController.refreshSession(req, res);
        });
        // logout
        // ---------
        this.adminRoute.post("/admin/logout", verifyAuth, blockStatusMiddleware.checkStatus, (req, res) => {
            authController.logout(req, res);
        });
    }
}
//# sourceMappingURL=adminRoute.js.map