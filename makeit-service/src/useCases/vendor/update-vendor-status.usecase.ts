import { inject, injectable } from "tsyringe";
import { IUpdateVendorStatusUseCase } from "../../domain/interface/useCaseInterface/vendor/update-vendor-status-usecase.interface";
import { IVendorRepository } from "../../domain/interface/repositoryInterfaces/users/vendor.repository.interface";
import { ISendEmailUseCase } from "../../domain/interface/useCaseInterface/common/send-email-usecase.interface";
import { statusTypes } from "../../shared/constants";


@injectable()
export class UpdateVendorStatusUseCase implements IUpdateVendorStatusUseCase{
     constructor(
     
      @inject("IVendorRepository")
      private _vendorRepository : IVendorRepository,
     
      @inject("ISendEmailUseCase")
      private _sendEmailUseCase : ISendEmailUseCase
     ){}
     
     async execute(id: string, status: statusTypes, message?: string): Promise<void> {
         const vendor = await this._vendorRepository.findOne({userId: id})
         console.log("vendor", status, vendor)
          if(status === "blocked"){
             await this._sendEmailUseCase.execute(
              vendor?.email as string,
              "MakeIt - Application rejected",
               message as string
             )
          }else{
            await this._vendorRepository.update({userId: id}, {status})
            await this._sendEmailUseCase.execute(
              vendor?.email as string,
              "MakeIt - Application approved",
              "your requst approved by admin"
            )
          }
     }

}