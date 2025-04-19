import { Request,Response } from "express";

export interface IClientAuthController{
   register(req: Request, res:Response): Promise<void>
   sendOtp(req: Request, res:Response): Promise<void>
   login(req:Request, res:Response): Promise<void>
   authenticateWithGoogle(req: Request, res: Response): Promise<void>;

}   