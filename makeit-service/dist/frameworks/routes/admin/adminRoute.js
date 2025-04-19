import { Router } from "express";
export class AdminRoute {
    adminRoute;
    constructor() {
        this.adminRoute = Router();
        this.setRoute();
    }
    setRoute() {
        this.adminRoute.get('/vendors', (req, res) => {
        });
    }
}
//# sourceMappingURL=adminRoute.js.map