import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { JSX } from "react";

interface NoAuthRouteProps {
	element: JSX.Element;
}

const getActiveSession = (state: RootState) => {
	if (state.client.client)
		return { role: state.client.client.role, type: "client" };
	if (state.venodr.vendor)
		return { role: state.venodr.vendor.role, type: "vendor" };
	if (state.admin.admin)
		return { role: state.admin.admin.role, type: "admin" };
	return null;
};

export const NoAuthRoute = ({ element }: NoAuthRouteProps) => {
	const session = useSelector((state: RootState) => getActiveSession(state));

	if (session && session.role) {
		const roleRedirects: Record<string, string> = {
			client: "/",
			vendor: "/vendor/profile",
			admin: "/admin/dashboard",
		};
		return <Navigate to={roleRedirects[session.role] || "/unauthorized"} />;
	}

	return element;
};
