var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
let UpdateVendorStatusUseCase = class UpdateVendorStatusUseCase {
    _vendorRepository;
    _sendEmailUseCase;
    constructor(_vendorRepository, _sendEmailUseCase) {
        this._vendorRepository = _vendorRepository;
        this._sendEmailUseCase = _sendEmailUseCase;
    }
    async execute(id, status, message) {
        const vendor = await this._vendorRepository.findOne({ userId: id });
        console.log("vendor", status, vendor);
        if (status === "blocked") {
            await this._sendEmailUseCase.execute(vendor?.email, "MakeIt - Application rejected", message);
        }
        else {
            await this._vendorRepository.update({ userId: id }, { status });
            await this._sendEmailUseCase.execute(vendor?.email, "MakeIt - Application approved", "your requst approved by admin");
        }
    }
};
UpdateVendorStatusUseCase = __decorate([
    injectable(),
    __param(0, inject("IVendorRepository")),
    __param(1, inject("ISendEmailUseCase")),
    __metadata("design:paramtypes", [Object, Object])
], UpdateVendorStatusUseCase);
export { UpdateVendorStatusUseCase };
//# sourceMappingURL=update-vendor-status.usecase.js.map