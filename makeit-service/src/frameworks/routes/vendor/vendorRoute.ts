import { Request,RequestHandler,Response,Router } from "express";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";
import { authController, blockStatusMiddleware, userController, serviceController, categoryController } from "../../di/resolver.js";



export class VendorRoute {
  public vendorRoute: Router;

   
   constructor(){
    this.vendorRoute = Router()
    this.setRoute()
   }
      private setRoute(): void{

          this.vendorRoute.put("/vendor/details",
            verifyAuth,
            // authorizeRole(["vendor"])
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res:Response) =>{
               userController.updateUserDetails(req,res)
            }
          )


        

      /** ==========================
       *  Service Management Routes
      * ========================== */

          this.vendorRoute.post("/vendor/service",
            verifyAuth,
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res: Response) => {
              serviceController.addService(req,res)
            }
          )
          this.vendorRoute.get("/vendor/service",
            verifyAuth,
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res: Response) => {
              serviceController.getAllServices(req,res)
            }
          )


          this.vendorRoute.put("/vendor/service/:serviceId",
            verifyAuth,
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res: Response) => {
              serviceController.editService(req,res)
            }
          )


          this.vendorRoute.patch("/vendor/service/:serviceId",
            verifyAuth,
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res: Response) => {
              serviceController.updateServiceStatus(req,res)
            }
          )
          

          this.vendorRoute.get("/vendor/categories",
            verifyAuth,
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request, res: Response) => {
              categoryController.getAllCategories(req,res)
             }
            )





      /** ==========================
       *  Session Management Routes
      * ========================== */         
     
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