import { inject, injectable } from "tsyringe";
import { IUserExistenceService } from "../../domain/interface/servicesInterface/user-existence-service.interface";
import { IClientRepository } from "../../domain/interface/repositoryInterfaces/users/client.repository.interface";
import { IAdminRepository } from "../../domain/interface/repositoryInterfaces/users/admin.repository.interface";
import { IVendorRepository } from "../../domain/interface/repositoryInterfaces/users/vendor.repository.interface";






@injectable()
export class UserExistenceService implements IUserExistenceService{
        constructor(
           @inject("IClientRepository")
           private _clientRepository: IClientRepository,

           @inject("IVendorRepository")
           private _vendorRepository: IVendorRepository,

           @inject("IAdminRepository")
           private _adminRepository: IAdminRepository
        ){}


        async emailExists(email: string): Promise<boolean> {
            const [client, admin, vendor] = await Promise.all([
               this._clientRepository.findOne({email}),
               this._vendorRepository.findOne({email}),
               this._adminRepository.findOne({email})
            ])

            return Boolean( client || admin || vendor)
        }
}

