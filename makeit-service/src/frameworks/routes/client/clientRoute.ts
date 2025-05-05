import { Request,RequestHandler,Response,Router } from "express";
import { authController, blockStatusMiddleware, userController, serviceController } from "../../di/resolver.js";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";



export class ClientRoute {
  public clientRoute: Router;

   
   constructor(){
    this.clientRoute = Router()
    this.setRoute()
   }
      private setRoute(): void{


         this.clientRoute.put("/vendor/details",
         verifyAuth,
         // authorizeRole(["client"])
         blockStatusMiddleware.checkStatus as RequestHandler,
         (req: Request, res:Response) =>{
          userController.updateUserDetails(req,res)
          })
         

        /** ==========================
         *  Client Service Management Routes
        * ========================== */

        this.clientRoute.get("/client/services",
          // verifyAuth,
          // authorizeRole(["client"])
          // blockStatusMiddleware.checkStatus as RequestHandler,
          (req: Request, res:Response) =>{
            serviceController.getAllServices(req,res)
          })


          this.clientRoute.get("/client/services/:serviceId",
          // verifyAuth,
          // blockStatusMiddleware.checkStatus as RequestHandler,
          (req: Request, res:Response) =>{
            serviceController.getServiceById(req,res)
          })  


        this.clientRoute.put("/client/profile",
          verifyAuth,
          blockStatusMiddleware.checkStatus as RequestHandler,
          (req: Request, res:Response) =>{
            console.log('client profile')
            userController.updateUserDetails(req,res)
          }   
        )






      /** ==========================
       *  Client Booking Management Routes
      * ========================== */

      this.clientRoute.post("/client/services/:serviceId/book",
        verifyAuth,
        blockStatusMiddleware.checkStatus as RequestHandler,
        (req: Request, res:Response) =>{
          serviceController.bookService(req,res)
        })








      /** ==========================
       *  Client Session Management Routes
      * ========================== */

           // logout
          this.clientRoute.post('/client/logout',
            verifyAuth,
            // authorizeRole(["client"])
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req: Request,res:Response) =>{
             authController.logout(req, res)
          })


          this.clientRoute.post( "/client/refresh-token",
            decodeToken,
            (req: Request, res: Response) => {
              console.log("refreshing client", req.body);
              authController.handleTokenRefresh(req, res);
            }
          )


           

        }
}