
export interface IEditCategoryUseCase {
   execute(id:string,title:string,description:string):Promise<void>
}