import { container } from "tsyringe";
import { RegisterClientUseCase } from "../../useCases/auth/register-user.useCase.js";
import { HashPassword } from "../security/hashPassword.js";
import { OtpService } from "../../useCases/services/otp-service.js";
import { EmailService } from "../../useCases/services/email.service.js";
import { sendOtpEmailUseCase } from "../../useCases/auth/send-otp-email.usecase.js";
import { VarifyOtpUseCase } from "../../useCases/auth/varify-otp-usecase.js";
import { LoginUserUseCase } from "../../useCases/auth/login-user.usecase.js";
import { JWTService } from "../../useCases/services/jwt-service.js";
import { GenerateTokenUseCase } from "../../useCases/auth/genarate-token.usecase.js";
import { UserExistenceService } from "../../useCases/services/user-existence.service.js";
import { GoogleUseCase } from "../../useCases/auth/google-usecase.js";
import { SendEmailUseCase } from "../../useCases/common/send-email.usecase.js";
import { GetAllUserUseCase } from "../../useCases/users/get-all-users.usecase.js";
import { UpdateUserStatusUseCase } from "../../useCases/users/update-user-status.usecase.js";
export class UseCaseRegistry {
    static registerUseCase() {
        // ======================= Auth ==========================//
        container.register("IClientRegisterUseCase", {
            useClass: RegisterClientUseCase
        });
        container.register("ISendOtpEmailUseCase", {
            useClass: sendOtpEmailUseCase
        });
        container.register("IVerifyOtpEmailUseCase", {
            useClass: VarifyOtpUseCase
        });
        container.register("ILoginUserUseCase", {
            useClass: LoginUserUseCase
        });
        container.register("ITokenService", {
            useClass: JWTService
        });
        container.register("IGenerateTokenUseCase", {
            useClass: GenerateTokenUseCase
        });
        container.register("IGoogleUseCase", {
            useClass: GoogleUseCase
        });
        container.register("IGetAllUsersUseCase", {
            useClass: GetAllUserUseCase
        });
        container.register("IUpdateUserStatusUseCase", {
            useClass: UpdateUserStatusUseCase
        });
        //======================= Register Bycripts =======================//
        container.register("IPasswordHasher", {
            useClass: HashPassword
        });
        //==================== Register Services =====================//
        container.register("IOtpService", {
            useClass: OtpService
        });
        container.register("IEmailService", {
            useClass: EmailService
        });
        container.register("IUserExistenceService", {
            useClass: UserExistenceService
        });
        container.register("ISendEmailUseCase", {
            useClass: SendEmailUseCase
        });
    }
}
//# sourceMappingURL=useCase.registry.js.map