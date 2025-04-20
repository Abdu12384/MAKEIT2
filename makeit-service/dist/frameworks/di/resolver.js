import { container } from "tsyringe";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { DependencyInjection } from "./index.js";
import { UserController } from "../../interfaceAdapters/controllers/user.controller.js";
DependencyInjection.registerAll();
// ================== Controller Resolving ====================== //
export const ClientAuthController = container.resolve(AuthController);
export const userController = container.resolve(UserController);
//# sourceMappingURL=resolver.js.map