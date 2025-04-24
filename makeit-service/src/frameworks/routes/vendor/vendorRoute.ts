import { Request,RequestHandler,Response,Router } from "express";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
import { authController, blockStatusMiddleware } from "../../di/resolver.js";



export class VendorRoute {
  public vendorRoute: Router;

   
   constructor(){
    this.vendorRoute = Router()
    this.setRoute()
   }
      private setRoute(): void{


         // logout
               this.vendorRoute.post('/vendor/logout',
                 verifyAuth,
                //  authorizeRole(["vendor"])
                 blockStatusMiddleware.checkStatus as RequestHandler,
                 (req: Request,res:Response) =>{
                  authController.logout(req, res)
               })
     
    
                 this.vendorRoute.post('/vendor/refresh-token',
                     decodeToken,
                     (req:Request, res:Response) =>{
                       console.log("refreshing Admin",req.body)
                       authController.handleTokenRefresh(req, res)
                    })
                    

   }
}