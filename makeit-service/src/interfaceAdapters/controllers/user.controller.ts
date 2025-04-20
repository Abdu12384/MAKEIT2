import { Request, Response } from "express";
import { IUserController } from "../../domain/interface/controllerInterfaces/users/user-controller.intreface.js";
import { inject, injectable } from "tsyringe";
import { IGetAllUsersUseCase } from "../../domain/interface/useCaseInterface/users/get-all-users-usecase.interface.js";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants.js";
import { handleErrorResponse } from "../../shared/utils/error.handler.js";
import { IUpdateUserStatusUseCase } from "../../domain/interface/useCaseInterface/users/update-user-status-usecase.interface.js";


@injectable()
export class UserController implements IUserController{
   constructor(
      @inject("IGetAllUsersUseCase")
      private _getAllUserUserCase: IGetAllUsersUseCase,

      @inject("IUpdateUserStatusUseCase")
      private _updateUserStatusUseCase : IUpdateUserStatusUseCase
   ){}




// ══════════════════════════════════════════════════════════
//  Get All Users (Role Based)
// ══════════════════════════════════════════════════════════

async getAllUsers(req: Request, res: Response): Promise<void> {
   try {
       console.log('quere',req.query)
        const { page = 1, limit = 10, search="", userType} = req.query
        const pageNumber = Number(page)
        const pageSize = Number(limit)
        const userTypeString =
                   typeof userType === "string" ? userType : "client";
                const searchTermString = typeof search === "string" ? search : "";

                const {users , total} = await this._getAllUserUserCase.execute(
                  userTypeString,
                  pageNumber,
                  pageSize,
                  searchTermString
                )

                res.status(HTTP_STATUS.OK).json({
                  success: true,
                  users,
                  totalPages: total,
                  currentPages: pageNumber
                })
            } catch (error) {
            handleErrorResponse(res, error)
           }
}





// ══════════════════════════════════════════════════════════
//  Update User Status
// ══════════════════════════════════════════════════════════

 async updateUserStatus(req: Request, res: Response): Promise<void> {
     try {
        const {userType, userId} = req.query as{
           userType: string,
           userId: any
        }

        await this._updateUserStatusUseCase.execute(userType, userId)

        res.status(HTTP_STATUS.OK).json({
          success: true,
          message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
        })
     } catch (error) {
       handleErrorResponse(res, error)
     }
 }



// ══════════════════════════════════════════════════════════
//  Update User Status
// ══════════════════════════════════════════════════════════



}