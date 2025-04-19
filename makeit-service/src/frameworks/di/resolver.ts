import { container } from "tsyringe"
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js"
import { IClientAuthController } from "../../domain/interface/controllerInterfaces/auth/auth-controller.interface.js"
import { DependencyInjection } from "./index.js"





DependencyInjection.registerAll()


// ================== Controller Resolving ====================== //
export const ClientAuthController = 
      container.resolve<IClientAuthController>(AuthController)

