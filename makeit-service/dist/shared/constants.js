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
};
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
};
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
    SHOP_UNDER_VERIFICATION: "Shop request submitted waiting for admin approval",
    SHOP_EXISTS: "You already have a registered shop",
    SHOP_BLOCKED: "This shop is blocked by admin",
    MISSING_PARAMETERS: "Some details are missing",
    WRONG_CURRENT_PASSWORD: "Current password is incorrect",
    ACCOUNT_UNDER_VERIFICATION: "Your account is under verification. Please wait for admin approval.",
    SAME_CURR_NEW_PASSWORD: "New password must be different from current password",
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
};
export const VERIFICATION_MAIL_CONTENT = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - MakeIT</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #121212; color: #ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <!-- Modern Dark Header -->
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td>
              <!-- Logo with glowing effect -->
              <div style="display: inline-block; position: relative; margin-bottom: 20px;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle, rgba(0,255,170,0.3) 0%, rgba(0,0,0,0) 70%); filter: blur(10px); z-index: 0;"></div>
                <h1 style="position: relative; z-index: 1; font-size: 42px; font-weight: 900; margin: 0; background: linear-gradient(90deg, #00ffaa 0%, #2e3192 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px;">
                  Make<span style="font-weight: 900;">IT</span>
                </h1>
              </div>
              <p style="margin: 0; color: #aaaaaa; font-size: 16px; letter-spacing: 1px;">INNOVATION STARTS HERE</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Main Content -->
    <tr>
      <td style="background-color: #1e1e1e; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <!-- Header Bar -->
          <tr>
            <td style="padding: 20px 30px; background: linear-gradient(90deg, #2e3192 0%, #00ffaa 100%); border-radius: 16px 16px 0 0;">
              <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Verify Your Account</h2>
            </td>
          </tr>
          
          <!-- Content Area -->
          <tr>
            <td style="padding: 40px 30px 20px;">
              <p style="margin: 0 0 20px; color: #dddddd; font-size: 16px; line-height: 1.6;">
                Hey there,
              </p>
              <p style="margin: 0 0 30px; color: #dddddd; font-size: 16px; line-height: 1.6;">
                Welcome to MakeIT! To complete your registration and unlock all features, please use the verification code below:
              </p>
            </td>
          </tr>
          
          <!-- OTP Section with futuristic design -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <div style="background-color: #252525; border-radius: 12px; padding: 30px; text-align: center; position: relative; overflow: hidden; border: 1px solid #333333;">
                      <!-- Decorative elements -->
                      <div style="position: absolute; top: -20px; left: -20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(46,49,146,0.2) 0%, rgba(0,0,0,0) 70%);"></div>
                      <div style="position: absolute; bottom: -30px; right: -30px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(0,255,170,0.1) 0%, rgba(0,0,0,0) 70%);"></div>
                      
                      <p style="margin: 0 0 20px; color: #aaaaaa; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Verification Code</p>
                      
                      <!-- OTP Display -->
                      <div style="display: flex; justify-content: center; margin: 0 auto;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            ${otp
    .split("")
    .map((digit, index) => `
                              <td style="padding: 0 4px;">
                                <div style="background-color: #2a2a2a; border: 1px solid ${index % 2 === 0 ? "#2e3192" : "#00ffaa"}; border-radius: 8px; padding: 15px 12px; font-family: 'Courier New', monospace; font-size: 28px; font-weight: bold; color: #ffffff; position: relative; overflow: hidden;">
                                  <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, ${index % 2 === 0 ? "#2e3192" : "#00ffaa"}, transparent);"></div>
                                  ${digit}
                                </div>
                              </td>
                            `)
    .join("")}
                          </tr>
                        </table>
                      </div>
                      
                      <p style="margin: 25px 0 0; color: #aaaaaa; font-size: 14px;">
                        Code expires in <span style="color: #00ffaa; font-weight: 600;">10:00</span> minutes
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Button Section -->
          <tr>
            <td style="padding: 0 30px 40px; text-align: center;">
              <p style="margin: 0 0 20px; color: #aaaaaa; font-size: 14px;">
                Having trouble? Contact our support team
              </p>
              <a href="#" style="display: inline-block; background: linear-gradient(90deg, #2e3192 0%, #00ffaa 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 30px; font-weight: 600; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">Get Help</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="padding: 40px 30px; text-align: center;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="padding: 0 0 20px;">
              <!-- Social Media Icons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="#" style="display: inline-block; width: 36px; height: 36px; background-color: #252525; border-radius: 50%; text-align: center; line-height: 36px; color: #00ffaa; text-decoration: none; font-size: 18px; border: 1px solid #333333;">
                      <span style="color: #00ffaa;">f</span>
                    </a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="#" style="display: inline-block; width: 36px; height: 36px; background-color: #252525; border-radius: 50%; text-align: center; line-height: 36px; color: #00ffaa; text-decoration: none; font-size: 18px; border: 1px solid #333333;">
                      <span style="color: #00ffaa;">in</span>
                    </a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="#" style="display: inline-block; width: 36px; height: 36px; background-color: #252525; border-radius: 50%; text-align: center; line-height: 36px; color: #00ffaa; text-decoration: none; font-size: 18px; border: 1px solid #333333;">
                      <span style="color: #00ffaa;">t</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin: 0 0 5px; color: #aaaaaa; font-size: 14px;">
                © ${new Date().getFullYear()} MakeIT. All rights reserved.
              </p>
              <p style="margin: 0; color: #666666; font-size: 12px;">
                123 Tech Street, Innovation City, TC 12345
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
//# sourceMappingURL=constants.js.map