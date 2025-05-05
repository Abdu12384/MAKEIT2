import { inject, injectable } from "tsyringe"
import { ICategoryRepository } from "../../domain/interface/repositoryInterfaces/admin/category-repository.interface"
import { IGetCategoryUseCase } from "../../domain/interface/useCaseInterface/admin/get-category-usecase.interface"





@injectable()
export class GetAllCategoryUseCase implements IGetCategoryUseCase{
    
  constructor(
    @inject("ICategoryRepository")
    private _categoryRepository: ICategoryRepository
  ){}

  async execute(pageNumber: number, pageSize: number, search: string, role: string): Promise<any> {
    const validPage = Math.max(1, pageNumber);  
    const validLimit = Math.max(1, pageSize);
    const skip = (validPage - 1) * validLimit;
  
    const filter: any = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (role === "vendor") {
      filter.status = "active";
    }
  
    const categories = await this._categoryRepository.findAll(filter, skip, validLimit);
    return categories;
  }
  
}
    

