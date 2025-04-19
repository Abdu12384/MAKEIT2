import 'reflect-metadata';
import { container } from 'tsyringe';
import { ClientRepository } from '../../interfaceAdapters/repository/users/client.repository.js';
import { OtpRepositroy } from '../../interfaceAdapters/repository/authService-repository/otp.repository.js';
import { VendorRepository } from '../../interfaceAdapters/repository/users/vendor.repository.js';
import { AdminRepository } from '../../interfaceAdapters/repository/users/admin.repository.js';
import { RefreshTokenRepository } from '../../interfaceAdapters/repository/authService-repository/refresh-token.repository.js';
export class RepositoryRegistry {
    static registerRepositories() {
        container.register('IClientRepository', {
            useClass: ClientRepository
        });
        container.register("IOtpRepositroy", {
            useClass: OtpRepositroy
        });
        container.register("IVendorRepository", {
            useClass: VendorRepository
        });
        container.register("IAdminRepository", {
            useClass: AdminRepository
        });
        container.register("IRefreshTokenReposiory", {
            useClass: RefreshTokenRepository
        });
    }
}
//# sourceMappingURL=repository.registry.js.map