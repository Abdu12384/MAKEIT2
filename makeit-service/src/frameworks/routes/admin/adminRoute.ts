import { Request,RequestHandler,Response,Router } from "express";
import { authController, blockStatusMiddleware, userController, vendorController } from "../../di/resolver.js";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";



export class AdminRoute {
  public adminRoute: Router;

   
   constructor(){
    this.adminRoute = Router()
    this.setRoute()
   }
     private setRoute(): void{


    /** =========================
     *  User Management Routes
     * ========================= */

     this.adminRoute.get('/admin/users',verifyAuth,authorizeRole(['admin']),(req: Request, res: Response) =>{
        userController.getAllUsers(req,res) 
     })

     this.adminRoute.patch('/admin/user/status',verifyAuth,authorizeRole(['admin']),(req:Request, res:Response) =>{
         userController.updateUserStatus(req,res)
     })




   /** ==========================
       *  Vendor Management Routes
      * ========================== */

     this.adminRoute.get("/admin/vendors",verifyAuth,authorizeRole(['admin']),(req:Request, res:Response) => {
         vendorController.getAllVendors(req, res)
     })

     this.adminRoute.put('/admin/vendor/:vendorId',verifyAuth,authorizeRole(['admin']),(req:Request, res:Response) =>{
         vendorController.updateVendorStatus(req,res)
     })



      /** ==========================
       *  Session  Routes
      * ========================== */

     this.adminRoute.post('/admin/refresh-token',
      decodeToken,
      (req:Request, res:Response) =>{
        console.log("refreshing Admin",req.body)
        authController.handleTokenRefresh(req, res)
     })
     
     this.adminRoute.get("/admin/refresh-session",
      verifyAuth,blockStatusMiddleware.checkStatus as RequestHandler,
      (req: Request, res:Response) =>{
        userController.refreshSession(req,res)
     })

     // logout
     // ---------
     this.adminRoute.post("/admin/logout",verifyAuth,
      blockStatusMiddleware.checkStatus as RequestHandler,
      (req: Request, res:Response) =>{
       authController.logout(req,res)
     })




    


        
   }

} 