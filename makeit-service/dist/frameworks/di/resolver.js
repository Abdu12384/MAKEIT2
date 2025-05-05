import { container } from "tsyringe";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { DependencyInjection } from "./index.js";
import { UserController } from "../../interfaceAdapters/controllers/user.controller.js";
import { VendorCantroller } from "../../interfaceAdapters/controllers/vendor.controller.js";
import { BlockStatusMiddleware } from "../../interfaceAdapters/middlewares/block.status.middleware.js";
import { ServiceController } from "../../interfaceAdapters/controllers/service.controller.js";
import { CategoryController } from "../../interfaceAdapters/controllers/category.controller.js";
DependencyInjection.registerAll();
//=================== Middleware Resolving =====================
export const blockStatusMiddleware = container.resolve(BlockStatusMiddleware);
// ================== Controller Resolving ====================== //
export const authController = container.resolve(AuthController);
export const userController = container.resolve(UserController);
export const vendorController = container.resolve(VendorCantroller);
export const serviceController = container.resolve(ServiceController);
export const categoryController = container.resolve(CategoryController);
//# sourceMappingURL=resolver.js.map