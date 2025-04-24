import { Request,RequestHandler,Response,Router } from "express";
import { authController, blockStatusMiddleware} from "../../di/resolver.js";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware.js";



export class ClientRoute {
  public clientRoute: Router;

   
   constructor(){
    this.clientRoute = Router()
    this.setRoute()
   }
      private setRoute(): void{



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
          );

          this.clientRoute.post('/client/refresh-token',
            decodeToken,
            (req:Request, res:Response) =>{
              console.log("refreshing Admin",req.body)
              authController.handleTokenRefresh(req, res)
           })
           


        }
}