import { container } from "tsyringe"
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js"
import { IClientAuthController } from "../../domain/interface/controllerInterfaces/auth/auth-controller.interface.js"
import { DependencyInjection } from "./index.js"
import { IUserController } from "../../domain/interface/controllerInterfaces/users/user-controller.intreface.js"
import { UserController } from "../../interfaceAdapters/controllers/user.controller.js"
import { IVendorController } from "../../domain/interface/controllerInterfaces/vendor/vendor-controller.interface.js"
import { VendorCantroller } from "../../interfaceAdapters/controllers/vendor.controller.js"
import { BlockStatusMiddleware } from "../../interfaceAdapters/middlewares/block.status.middleware.js"





DependencyInjection.registerAll()


//=================== Middleware Resolving =====================

export const blockStatusMiddleware = container.resolve(BlockStatusMiddleware)

// ================== Controller Resolving ====================== //
export const authController = 
      container.resolve<IClientAuthController>(AuthController);

export const userController = 
        container.resolve<IUserController>(UserController)


export const vendorController = 
         container.resolve<IVendorController>(VendorCantroller)