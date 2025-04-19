import 'reflect-metadata';
import { container } from 'tsyringe';

import { IClientRepository} from '../../domain/interface/repositoryInterfaces/users/client.repository.interface.js';
import { ClientRepository } from '../../interfaceAdapters/repository/users/client.repository.js';
import { IOtpRepositroy } from '../../domain/interface/repositoryInterfaces/services/otp-service.repository.js';
import { OtpRepositroy } from '../../interfaceAdapters/repository/authService-repository/otp.repository.js';
import { IVendorRepository } from '../../domain/interface/repositoryInterfaces/users/vendor.repository.interface.js';
import { VendorRepository } from '../../interfaceAdapters/repository/users/vendor.repository.js';
import { IAdminRepository } from '../../domain/interface/repositoryInterfaces/users/admin.repository.interface.js';
import { AdminRepository } from '../../interfaceAdapters/repository/users/admin.repository.js';
import { IRefreshTokenReposiory } from '../../domain/interface/repositoryInterfaces/services/refresh-token.entity.js';
import { RefreshTokenRepository } from '../../interfaceAdapters/repository/authService-repository/refresh-token.repository.js';


export class RepositoryRegistry {
   static registerRepositories():void{
    
      container.register<IClientRepository>('IClientRepository',{
        useClass: ClientRepository
      })    

      container.register<IOtpRepositroy>("IOtpRepositroy",{
         useClass: OtpRepositroy
      })

      container.register<IVendorRepository>("IVendorRepository",{
         useClass: VendorRepository
      })

      container.register<IAdminRepository>("IAdminRepository",{
         useClass: AdminRepository
      })

      container.register<IRefreshTokenReposiory>("IRefreshTokenReposiory",{
         useClass: RefreshTokenRepository
      })


   }
}