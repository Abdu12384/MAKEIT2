var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants.js";
import { handleErrorResponse } from "../../shared/utils/error.handler.js";
let UserController = class UserController {
    _getAllUserUserCase;
    _updateUserStatusUseCase;
    constructor(_getAllUserUserCase, _updateUserStatusUseCase) {
        this._getAllUserUserCase = _getAllUserUserCase;
        this._updateUserStatusUseCase = _updateUserStatusUseCase;
    }
    // ══════════════════════════════════════════════════════════
    //  Get All Users (Role Based)
    // ══════════════════════════════════════════════════════════
    async getAllUsers(req, res) {
        try {
            console.log('quere', req.query);
            const { page = 1, limit = 10, search = "", userType } = req.query;
            const pageNumber = Number(page);
            const pageSize = Number(limit);
            const userTypeString = typeof userType === "string" ? userType : "client";
            const searchTermString = typeof search === "string" ? search : "";
            const { users, total } = await this._getAllUserUserCase.execute(userTypeString, pageNumber, pageSize, searchTermString);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                users,
                totalPages: total,
                currentPages: pageNumber
            });
        }
        catch (error) {
            handleErrorResponse(res, error);
        }
    }
    // ══════════════════════════════════════════════════════════
    //  Update User Status
    // ══════════════════════════════════════════════════════════
    async updateUserStatus(req, res) {
        try {
            const { userType, userId } = req.query;
            await this._updateUserStatusUseCase.execute(userType, userId);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
            });
        }
        catch (error) {
            handleErrorResponse(res, error);
        }
    }
};
UserController = __decorate([
    injectable(),
    __param(0, inject("IGetAllUsersUseCase")),
    __param(1, inject("IUpdateUserStatusUseCase")),
    __metadata("design:paramtypes", [Object, Object])
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map