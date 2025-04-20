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

  
   }
}