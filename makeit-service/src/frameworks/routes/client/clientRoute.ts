import { Request,Response,Router } from "express";
import { ClientAuthController } from "../../di/resolver.js";



export class ClientRoute {
  public clientRoute: Router;

   
   constructor(){
    this.clientRoute = Router()
    this.setRoute()
   }
      private setRoute(): void{


          this.clientRoute.post('/signup', (req: Request, res:Response) => 
            ClientAuthController.register(req,res)
           )


          this.clientRoute.post('/send-otp',(req: Request, res:Response) =>  
             ClientAuthController.sendOtp(req,res)
           )


           this.clientRoute.post('/login',(req:Request,res:Response) =>
             ClientAuthController.login(req,res)
          )


   }

}