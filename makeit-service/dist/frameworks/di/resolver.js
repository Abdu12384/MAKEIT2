import { container } from "tsyringe";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { DependencyInjection } from "./index.js";
DependencyInjection.registerAll();
// ================== Controller Resolving ====================== //
export const ClientAuthController = container.resolve(AuthController);
//# sourceMappingURL=resolver.js.map