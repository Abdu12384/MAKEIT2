



export type UserRoles = "admin" | "vendor" | "client";


export interface ILoginData {
	email: string;
	password: string;
	role: UserRoles;
}

