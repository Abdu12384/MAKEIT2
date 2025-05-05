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
import { GetAllVendorUseCase } from "../../useCases/vendor/get-all-vendor-usecase.js";
import { UpdateVendorStatusUseCase } from "../../useCases/vendor/update-vendor-status.usecase.js";
import { RefreshTokenUseCase } from "../../useCases/auth/refresh-token.usecase.js";
import { GetUserDetailsUseCase } from "../../useCases/users/get-user-details.usecase.js";
import { BlackListTokenUseCase } from "../../useCases/auth/blacklist-token.usecase.js";
import { RevokeRefreshTokenUseCase } from "../../useCases/auth/revoke-refresh-token.usecase.js";
import { UpdateUserDetailsUseCase } from "../../useCases/users/update-user-details.usecase.js";
import { AddServiceUseCase } from "../../useCases/vendor/service/add-service.usecase.js";
import { GetAllServiceUseCase } from "../../useCases/vendor/service/get-all-service.usecase.js";
import { CategoryUseCase } from "../../useCases/admin/create-category-usecase.js";
import { GetAllCategoryUseCase } from "../../useCases/admin/get-all-category-usecase.js";
import { UpdateStatusCategoryUseCase } from "../../useCases/admin/update-category-usecase.js";
import { EditCategoryUseCase } from "../../useCases/admin/edit-category-usecase.js";
import { EditServiceUseCase } from "../../useCases/vendor/service/edit-service.usecase.js";
import { UpdateServiceStatusUseCase } from "../../useCases/vendor/service/update-status-service.usecase.js";
import { GetServiceByIdUseCase } from "../../useCases/vendor/service/get-service-by-id.usecase.js";
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
        container.register("IGetAllVendorUseCase", {
            useClass: GetAllVendorUseCase
        });
        container.register("IUpdateVendorStatusUseCase", {
            useClass: UpdateVendorStatusUseCase
        });
        container.register("IGetUserDetailsUseCase", {
            useClass: GetUserDetailsUseCase
        });
        container.register("IBlackListTokenUseCase", {
            useClass: BlackListTokenUseCase
        });
        container.register("IRevokeRefreshTokenUseCase", {
            useClass: RevokeRefreshTokenUseCase
        });
        container.register("IUpdateUserDetailsUseCase", {
            useClass: UpdateUserDetailsUseCase
        });
        container.register("IAddServiceUseCase", {
            useClass: AddServiceUseCase
        });
        container.register("IGetAllServicesUseCase", {
            useClass: GetAllServiceUseCase
        });
        container.register("ICategoryUseCase", {
            useClass: CategoryUseCase
        });
        container.register("IGetCategoryUseCase", {
            useClass: GetAllCategoryUseCase
        });
        container.register("IUpdateStatusCategoryUseCase", {
            useClass: UpdateStatusCategoryUseCase
        });
        container.register("IEditCategoryUseCase", {
            useClass: EditCategoryUseCase
        });
        container.register("IEditServiceUseCase", {
            useClass: EditServiceUseCase
        });
        container.register("IUpdateServiceStatusUseCase", {
            useClass: UpdateServiceStatusUseCase
        });
        container.register("IGetServiceByIdUseCase", {
            useClass: GetServiceByIdUseCase
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
        container.register("IRefreshTokenUseCase", {
            useClass: RefreshTokenUseCase
        });
    }
}
//# sourceMappingURL=useCase.registry.js.map