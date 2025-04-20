

type statusTypes = "active" | "pending" | "blocked";


export type UserRoles = "admin" | "vendor" | "client";


export interface ILoginData {
	email: string;
	password: string;
	role: UserRoles;
}



export interface User{
	userId?: string
	name:string,
	email:string,
	phone:string,
	password:string,
	role?:UserRoles,
	status?:statusTypes,
	profileImage?:string
	createdAt?:Date,
	lastLogin?:Date,
	onlineStatus?:'online'|'offline',
	isAdmin?:boolean
}



export interface IClient extends User{
	userId?:string,
	googleVarified?:boolean
}


export interface IVendor extends User{
	idProof?: string,
	vendorId?: string,
	vendorStatus?:'pending'| 'approved' | 'rejected'
	rejectionReason?:string
}