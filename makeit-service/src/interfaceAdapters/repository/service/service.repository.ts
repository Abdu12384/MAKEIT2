import { injectable } from "tsyringe";
import { BaseRepository } from "../base.repository.js";
import { IServiceRepository } from "../../../domain/interface/repositoryInterfaces/service/service-repository.interface.js";
import { IServiceModel, serviceModel } from "../../../frameworks/database/mongodb/model/service.model.js";



@injectable()
export class ServiceRepository extends BaseRepository<IServiceModel> implements IServiceRepository{
   constructor(){
     super(serviceModel)
   }

  }