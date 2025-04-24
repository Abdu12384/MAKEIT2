import { IPaginatedVendor } from "../../../entities/paginated/paginated-shop.entity";

export interface IGetAllVendorUseCase {
	execute(
		forType: string,
		pageNumber: number,
		pageSize: number,
		searchTerm: string
	): Promise<IPaginatedVendor>;
}








