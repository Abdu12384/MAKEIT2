



export class AuthRoute {
  public authRoute: Router;

   
   constructor(){
    this.authRoute = Router()
    this.setRoute()
   }
      private setRoute(): void{


          this.authRoute.post('/signup', (req: Request, res:Response) => 
            ClientAuthController.register(req,res)
           )


          this.authRoute.post('/send-otp',(req: Request, res:Response) =>  
             ClientAuthController.sendOtp(req,res)
           )


           this.authRoute.post('/login',(req:Request,res:Response) =>
             ClientAuthController.login(req,res)
          )

          this.authRoute.post('/google-auth',(req:Request,res:Response) =>
             ClientAuthController.authenticateWithGoogle(req,res)
           )


   }

}