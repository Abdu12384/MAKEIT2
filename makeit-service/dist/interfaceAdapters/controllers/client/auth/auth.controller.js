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
import { injectable, inject } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants.js";
import { handleErrorResponse } from "../../../../shared/utils/error.handler.js";
let AuthController = class AuthController {
    _registerUseCase;
    _sendOtpEmailUseCase;
    _varifyOtpUseCase;
    constructor(_registerUseCase, _sendOtpEmailUseCase, _varifyOtpUseCase) {
        this._registerUseCase = _registerUseCase;
        this._sendOtpEmailUseCase = _sendOtpEmailUseCase;
        this._varifyOtpUseCase = _varifyOtpUseCase;
    }
    // ══════════════════════════════════════════════════════════
    // 📧 Sending OTP to User Email
    // ══════════════════════════════════════════════════════════
    async sendOtp(req, res) {
        try {
            const { email } = req.body;
            console.log('otp sending....');
            await this._sendOtpEmailUseCase.execute(email);
            res.status(HTTP_STATUS.OK).json(SUCCESS_MESSAGES.OTP_SEND_SUCCESS);
        }
        catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to send OTP" });
        }
    }
    // ══════════════════════════════════════════════════════════
    // 📝 Register New Client
    // ══════════════════════════════════════════════════════════
    async register(req, res) {
        try {
            console.log('varifying....', req.body);
            const { formdata, otpString } = req.body;
            await this._varifyOtpUseCase.execute(formdata.email, otpString);
            const client = await this._registerUseCase.createClient(formdata);
            res.status(HTTP_STATUS.CREATED).json({ message: SUCCESS_MESSAGES.CREATED, data: client });
        }
        catch (error) {
            handleErrorResponse(res, error);
        }
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject("IClientRegisterUseCase")),
    __param(1, inject("ISendOtpEmailUseCase")),
    __param(2, inject("IVerifyOtpEmailUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map