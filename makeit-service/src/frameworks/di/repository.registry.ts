import 'reflect-metadata';
import { container } from 'tsyringe';

import { IClientRepository} from '../../domain/interface/repositoryInterfaces/users/client.repository.interface.js';
import { ClientRepository } from '../../interfaceAdapters/repository/users/client.repository.js';
import { IOtpRepositroy } from '../../domain/interface/repositoryInterfaces/common-services/otp-service.repository.js';
import { OtpRepositroy } from '../../interfaceAdapters/repository/authService-repository/otp.repository.js';
import { IVendorRepository } from '../../domain/interface/repositoryInterfaces/users/vendor.repository.interface.js';
import { VendorRepository } from '../../interfaceAdapters/repository/users/vendor.repository.js';
import { IAdminRepository } from '../../domain/interface/repositoryInterfaces/users/admin.repository.interface.js';
import { AdminRepository } from '../../interfaceAdapters/repository/users/admin.repository.js';
import { IRefreshTokenReposiory } from '../../domain/interface/repositoryInterfaces/common-services/refresh-token.entity.js';
import { RefreshTokenRepository } from '../../interfaceAdapters/repository/authService-repository/refresh-token.repository.js';
import { IRedisTokenRepository } from '../../domain/interface/repositoryInterfaces/redis/redis-token-repository.interface.js';
import { RedisTokenRepository } from '../../interfaceAdapters/repository/redis/redis-token.repository.js';
import { IServiceRepository } from '../../domain/interface/repositoryInterfaces/service/service-repository.interface.js';
import { ServiceRepository } from '../../interfaceAdapters/repository/service/service.repository.js';
import { ICategoryRepository } from '../../domain/interface/repositoryInterfaces/admin/category-repository.interface.js';
import { CategoryRepository } from '../../interfaceAdapters/repository/admin/category-repository.js';


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

      container.register<IRedisTokenRepository>("IRedisTokenRepository",{
         useClass: RedisTokenRepository
      })

      container.register<IServiceRepository>("IServiceRepository",{
         useClass: ServiceRepository
      })

      container.register<ICategoryRepository>("ICategoryRepository",{
         useClass: CategoryRepository
      })



   }
}