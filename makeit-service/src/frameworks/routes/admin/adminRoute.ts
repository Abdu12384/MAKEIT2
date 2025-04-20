import { Request,Response,Router } from "express";
import { userController } from "../../di/resolver.js";



export class AdminRoute {
  public adminRoute: Router;

   
   constructor(){
    this.adminRoute = Router()
    this.setRoute()
   }
     private setRoute(): void{

     this.adminRoute.get('/users',(req: Request, res: Response) =>{
        userController.getAllUsers(req,res) 
     })
        
   }

}