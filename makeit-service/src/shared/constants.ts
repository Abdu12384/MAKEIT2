

export type TRole = "client" | "admin" | "vendor";
export type statusTypes = "active" | "pending" | "blocked";


export const HTTP_STATUS = {
	// ✅ Success responses
	OK: 200, // Request was successful (e.g., fetching data, updating without response body)
	CREATED: 201, // Resource successfully created (e.g., user registration, new booking)
	ACCEPTED: 202, // Request accepted for processing but not completed yet (e.g., background job)
	NO_CONTENT: 204, // Request successful but no content returned (e.g., deleting a resource)

	// ❌ Client errors
	BAD_REQUEST: 400, // Invalid request (e.g., missing fields, invalid data format)
	UNAUTHORIZED: 401, // Authentication required (e.g., user not logged in, invalid token)
	FORBIDDEN: 403, // Access denied (e.g., trying to access admin-only routes)
	NOT_FOUND: 404, // Requested resource not found (e.g., wrong ID, missing endpoint)
	METHOD_NOT_ALLOWED: 405, // HTTP method not supported (e.g., using GET instead of POST)
	CONFLICT: 409, // Conflict in request (e.g., duplicate email, already registered)
	PAYLOAD_TOO_LARGE: 413, // Request payload is too large (e.g., file upload exceeds limit)
	UNSUPPORTED_MEDIA_TYPE: 415, // Unsupported content type (e.g., sending XML instead of JSON)
	TOO_MANY_REQUESTS: 429, // Rate limiting (e.g., too many login attempts, API abuse)

	// ⚠️ Server errors
	INTERNAL_SERVER_ERROR: 500, // Generic server error (e.g., database failure, unhandled exception)
	NOT_IMPLEMENTED: 501, // Feature not implemented yet (e.g., unbuilt endpoint)
	BAD_GATEWAY: 502, // Server received invalid response from upstream (e.g., microservices failure)
	SERVICE_UNAVAILABLE: 503, // Server is down or overloaded (e.g., maintenance mode)
	GATEWAY_TIMEOUT: 504, // Upstream server timed out (e.g., long API response time)
} as const;

export const SUCCESS_MESSAGES = {
	BOOKING_SUCCESS: "Booking completed",
	CREATED: "Successfully created",
	ADDED: "Successfully Added",
	LOGIN_SUCCESS: "Logged in",
	REGISTRATION_SUCCESS: "Registration completed",
	OTP_SEND_SUCCESS: "OTP sent",
	OTP_VERIFIED: "OTP verified",
	LOGOUT_SUCCESS: "Logged out",
	UPDATE_SUCCESS: "Updated",
	DELETE_SUCCESS: "Deleted",
	OPERATION_SUCCESS: "Action completed",
	PASSWORD_RESET_SUCCESS: "Password reset",
	VERIFICATION_SUCCESS: "Verification done",
	DATA_RETRIEVED: "Data loaded",
	ACTION_SUCCESS: "Action successful",
	EMAIL_SENT_SUCCESSFULLY: "Email sent",
	REQUEST_SUBMITTED: "Request submitted waiting for admin approval",
	APPLICATION_SUBMITTED: "Application submitted waiting for admin approval",
	REQUEST_APPROVED: "Request approved",
	REQUEST_REJECTED: "Request rejected",
	ACCOUNT_ACTIVATED: "Your account is now active",
	ACCOUNT_DEACTIVATED: "Your account has been deactivated",
	TRANSACTION_SUCCESS: "Transaction successful",
	REFUND_INITIATED: "Refund process started",
	PAYMENT_SUCCESS: "Payment completed",
	PAYMENT_PENDING: "Payment is being processed",
	PAYMENT_FAILED: "Payment failed please try again",
	FILE_UPLOADED: "File uploaded successfully",
	PROFILE_UPDATED: "Profile updated",
	SESSION_EXTENDED: "Session extended",
} as const;

export const ERROR_MESSAGES = {
	WRONG_ID: "Invalid ID",
	TOKEN_EXPIRED: "Session expired login again",
	TOKEN_BLACKLISTED: "Session is no longer valid",
	EMAIL_NOT_FOUND: "Email not found",
	FORBIDDEN: "You don’t have access",
	BLOCKED: "Your account is blocked",
	NOT_ALLOWED: "You can’t do this action",
	EMAIL_EXISTS: "Email already registered",
	USERNAME_EXISTS: "Username already taken",
	REQUEST_NOT_FOUND: "Request not found",
	SERVICE_EXISTS: "Service already exists",
	SERVICE_NOT_FOUND: "Service not found",
	INVALID_TOKEN: "Invalid session please login again",
	INVALID_ROLE: "Access denied",
	INVALID_OTP: "Invalid or expired otp",
	INVALID_CREDENTIALS: "Wrong email or password",
	USER_NOT_FOUND: "User not found",
	ROUTE_NOT_FOUND: "Page not found",
	UNAUTHORIZED_ACCESS: "Not authorized",
	SERVER_ERROR: "Something went wrong try again later",
	VALIDATION_ERROR: "Check your inputs and try again",
	SHOP_NOT_FOUND: "Shop not found",
	SHOP_UNDER_VERIFICATION:
		"Shop request submitted waiting for admin approval",
	SHOP_EXISTS: "You already have a registered shop",
	SHOP_BLOCKED: "This shop is blocked by admin",
	MISSING_PARAMETERS: "Some details are missing",
	WRONG_CURRENT_PASSWORD: "Current password is incorrect",
	ACCOUNT_UNDER_VERIFICATION:
		"Your account is under verification. Please wait for admin approval.",
	SAME_CURR_NEW_PASSWORD:
		"New password must be different from current password",
	INSUFFICIENT_FUNDS: "Not enough balance",
	TRANSACTION_FAILED: "Transaction failed try again",
	REFUND_FAILED: "Refund process failed",
	PAYMENT_ERROR: "Payment could not be processed",
	ACCOUNT_SUSPENDED: "Your account has been suspended",
	ACCOUNT_BANNED: "Your account has been banned",
	SESSION_EXPIRED: "Your session has expired please log in again",
	TOO_MANY_ATTEMPTS: "Too many failed attempts try again later",
	UNSUPPORTED_FILE_TYPE: "Unsupported file type",
	FILE_SIZE_EXCEEDED: "File size is too large",
	RATE_LIMIT_EXCEEDED: "Too many requests try again later",
} as const;
