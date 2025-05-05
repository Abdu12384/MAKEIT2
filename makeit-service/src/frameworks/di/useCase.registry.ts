import { container } from "tsyringe";
import { IRegisterUseCase } from "../../domain/interface/useCaseInterface/auth/register.usecase.js";
import { RegisterClientUseCase } from "../../useCases/auth/register-user.useCase.js";
import { IPasswordHasher } from "../../domain/interface/useCaseInterface/auth/passwordHasher.interface.js";
import { HashPassword } from "../security/hashPassword.js";
import { IOtpService} from "../../domain/interface/servicesInterface/otp-service.interface.js";
import { OtpService } from "../../useCases/services/otp-service.js";
import { IEmailService } from "../../domain/interface/servicesInterface/email.service.interface.js";
import { EmailService } from "../../useCases/services/email.service.js";
import { sendOtpEmailUseCase } from "../../useCases/auth/send-otp-email.usecase.js";
import { ISendOtpEmailUseCase } from "../../domain/interface/useCaseInterface/auth/sent-otp-usecase.interface.js";
import { IVerifyOtpEmailUseCase } from "../../domain/interface/useCaseInterface/auth/verify-otp-usercase.interface.js";
import { VarifyOtpUseCase } from "../../useCases/auth/varify-otp-usecase.js";
import { ILoginUserUseCase } from "../../domain/interface/useCaseInterface/auth/login.usecase.interface.js";
import { LoginUserUseCase } from "../../useCases/auth/login-user.usecase.js";
import { ITokenService } from "../../domain/interface/servicesInterface/jwt-service.interface.js";
import { JWTService } from "../../useCases/services/jwt-service.js";
import { IGenerateTokenUseCase } from "../../domain/interface/useCaseInterface/auth/genarate-token-usecase.interface.js";
import { GenerateTokenUseCase } from "../../useCases/auth/genarate-token.usecase.js";
import { IUserExistenceService } from "../../domain/interface/servicesInterface/user-existence-service.interface.js";
import { UserExistenceService } from "../../useCases/services/user-existence.service.js";
import { IGoogleUseCase } from "../../domain/interface/useCaseInterface/auth/google-usecase.interface.js";
import { GoogleUseCase } from "../../useCases/auth/google-usecase.js";
import { SendEmailUseCase } from "../../useCases/common/send-email.usecase.js";
import { ISendEmailUseCase } from "../../domain/interface/useCaseInterface/common/send-email-usecase.interface.js";
import { IGetAllUsersUseCase } from "../../domain/interface/useCaseInterface/users/get-all-users-usecase.interface.js";
import { GetAllUserUseCase } from "../../useCases/users/get-all-users.usecase.js";
import { IUpdateUserStatusUseCase } from "../../domain/interface/useCaseInterface/users/update-user-status-usecase.interface.js";
import { UpdateUserStatusUseCase } from "../../useCases/users/update-user-status.usecase.js";
import { IGetAllVendorUseCase } from "../../domain/interface/useCaseInterface/vendor/get-all-vendor-usecase.interface.js";
import { GetAllVendorUseCase } from "../../useCases/vendor/get-all-vendor-usecase.js";
import { IUpdateVendorStatusUseCase } from "../../domain/interface/useCaseInterface/vendor/update-vendor-status-usecase.interface.js";
import { UpdateVendorStatusUseCase } from "../../useCases/vendor/update-vendor-status.usecase.js";
import { IRefreshTokenUseCase } from "../../domain/interface/useCaseInterface/auth/refresh-token-usecase.interface.js";
import { RefreshTokenUseCase } from "../../useCases/auth/refresh-token.usecase.js";
import { IGetUserDetailsUseCase } from "../../domain/interface/useCaseInterface/users/get-user-details-usecase.interface.js";
import { GetUserDetailsUseCase } from "../../useCases/users/get-user-details.usecase.js";
import { BlackListTokenUseCase } from "../../useCases/auth/blacklist-token.usecase.js";
import { IBlackListTokenUseCase } from "../../domain/interface/useCaseInterface/auth/blacklist-token-usecase.interface.js";
import { IRevokeRefreshTokenUseCase } from "../../domain/interface/useCaseInterface/auth/revok-refresh-token-usecase.interface.js";
import { RevokeRefreshTokenUseCase } from "../../useCases/auth/revoke-refresh-token.usecase.js";
import { IUpdateUserDetailsUseCase } from "../../domain/interface/useCaseInterface/users/update-user-details-usecase.interface.js";
import { UpdateUserDetailsUseCase} from "../../useCases/users/update-user-details.usecase.js";
import { IAddServiceUseCase } from "../../domain/interface/useCaseInterface/vendor/service/add-service-usecase.interface.js";
import { AddServiceUseCase } from "../../useCases/vendor/service/add-service.usecase.js";
import { IGetAllServicesUseCase } from "../../domain/interface/useCaseInterface/vendor/service/get-all-service-usecase.interface.js";
import { GetAllServiceUseCase } from "../../useCases/vendor/service/get-all-service.usecase.js";
import { ICategoryUseCase } from "../../domain/interface/useCaseInterface/admin/create-category-usecase.interface.js";
import { CategoryUseCase } from "../../useCases/admin/create-category-usecase.js";
import { IGetCategoryUseCase } from "../../domain/interface/useCaseInterface/admin/get-category-usecase.interface.js";
import { GetAllCategoryUseCase } from "../../useCases/admin/get-all-category-usecase.js";
import { IUpdateStatusCategoryUseCase } from "../../domain/interface/useCaseInterface/admin/update-category-usecase.interface.js";
import { UpdateStatusCategoryUseCase } from "../../useCases/admin/update-category-usecase.js";
import { IEditCategoryUseCase } from "../../domain/interface/useCaseInterface/admin/edit-category-usecase.interface.js";
import { EditCategoryUseCase } from "../../useCases/admin/edit-category-usecase.js";
import { IEditServiceUseCase } from "../../domain/interface/useCaseInterface/vendor/service/edit-service-usecase.interface.js";
import { EditServiceUseCase } from "../../useCases/vendor/service/edit-service.usecase.js";
import { IUpdateServiceStatusUseCase } from "../../domain/interface/useCaseInterface/vendor/service/update-service-status-usecase.interface.js";
import { UpdateServiceStatusUseCase } from "../../useCases/vendor/service/update-status-service.usecase.js";
import { IGetServiceByIdUseCase } from "../../domain/interface/useCaseInterface/vendor/service/get-service-by-id-usecase.interface.js";
import { GetServiceByIdUseCase } from "../../useCases/vendor/service/get-service-by-id.usecase.js";



export class UseCaseRegistry {
   static registerUseCase(): void{

    // ======================= Auth ==========================//
     container.register<IRegisterUseCase>("IClientRegisterUseCase",{
       useClass: RegisterClientUseCase
     })
   
     container.register<ISendOtpEmailUseCase>("ISendOtpEmailUseCase",{
      useClass: sendOtpEmailUseCase
     })
    
     container.register<IVerifyOtpEmailUseCase>("IVerifyOtpEmailUseCase",{
      useClass: VarifyOtpUseCase
     })
    
     container.register<ILoginUserUseCase>("ILoginUserUseCase",{
      useClass: LoginUserUseCase
     })

     container.register<ITokenService>("ITokenService",{
       useClass: JWTService
     })

     container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase",{
      useClass: GenerateTokenUseCase
     })

     container.register<IGoogleUseCase>("IGoogleUseCase",{
      useClass: GoogleUseCase
     })

     container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase",{
      useClass: GetAllUserUseCase
     })


     container.register<IUpdateUserStatusUseCase>("IUpdateUserStatusUseCase",{
       useClass: UpdateUserStatusUseCase
     })

     container.register<IGetAllVendorUseCase>("IGetAllVendorUseCase",{
      useClass: GetAllVendorUseCase
     })


     container.register<IUpdateVendorStatusUseCase>("IUpdateVendorStatusUseCase",{
      useClass: UpdateVendorStatusUseCase
     })


     container.register<IGetUserDetailsUseCase>("IGetUserDetailsUseCase",{
      useClass: GetUserDetailsUseCase
     })

     container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase",{
      useClass: BlackListTokenUseCase
     })


     container.register<IRevokeRefreshTokenUseCase>("IRevokeRefreshTokenUseCase",{
      useClass: RevokeRefreshTokenUseCase
     })

     container.register<IUpdateUserDetailsUseCase>("IUpdateUserDetailsUseCase",{
      useClass: UpdateUserDetailsUseCase
     })

     container.register<IAddServiceUseCase>("IAddServiceUseCase",{
      useClass: AddServiceUseCase
     })

     container.register<IGetAllServicesUseCase>("IGetAllServicesUseCase",{
      useClass: GetAllServiceUseCase
     })

     container.register<ICategoryUseCase>("ICategoryUseCase",{
      useClass: CategoryUseCase
     })

     container.register<IGetCategoryUseCase>("IGetCategoryUseCase",{
      useClass: GetAllCategoryUseCase
     }) 

     container.register<IUpdateStatusCategoryUseCase>("IUpdateStatusCategoryUseCase",{
      useClass: UpdateStatusCategoryUseCase
     })    

     container.register<IEditCategoryUseCase>("IEditCategoryUseCase",{
      useClass: EditCategoryUseCase
     })     


     container.register<IEditServiceUseCase>("IEditServiceUseCase",{
      useClass: EditServiceUseCase
     }) 

     container.register<IUpdateServiceStatusUseCase>("IUpdateServiceStatusUseCase",{
      useClass: UpdateServiceStatusUseCase
     })   

     container.register<IGetServiceByIdUseCase>("IGetServiceByIdUseCase",{
      useClass: GetServiceByIdUseCase
     }) 

   //======================= Register Bycripts =======================//

     container.register<IPasswordHasher>("IPasswordHasher",{
       useClass: HashPassword
     })









     //==================== Register Services =====================//
    container.register<IOtpService>("IOtpService",{
      useClass: OtpService
    })
    
    container.register<IEmailService>("IEmailService",{
      useClass: EmailService
    })

    container.register<IUserExistenceService>("IUserExistenceService",{
      useClass: UserExistenceService
    })

    container.register<ISendEmailUseCase>("ISendEmailUseCase",{
      useClass: SendEmailUseCase
    })

    container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase",{
       useClass: RefreshTokenUseCase
    })

  
   }
}