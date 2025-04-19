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
import { injectable, inject } from "tsyringe";
import { CustomError } from "../../domain/utils/custom.error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants.js";
let RegisterClientUseCase = class RegisterClientUseCase {
    _clientRepository;
    _passwordHasher;
    constructor(_clientRepository, _passwordHasher) {
        this._clientRepository = _clientRepository;
        this._passwordHasher = _passwordHasher;
    }
    async createUsers(user) {
        console.log('useCase', user);
        const { role, email, password } = user;
        const isEmailExisting = await this._clientRepository.findByEmail(email);
        if (isEmailExisting) {
            throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
        }
        const hashedPassword = password
            ? await this._passwordHasher.hash(password)
            : null;
        let repository;
        if (role === "client") {
            repository = this._clientRepository;
        }
        else {
            throw new CustomError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.BAD_REQUEST);
        }
        return await repository.save({
            ...user,
            password: hashedPassword ?? "",
            userId: 'sdfsd'
        });
    }
};
RegisterClientUseCase = __decorate([
    injectable(),
    __param(0, inject("IClientRepository")),
    __param(1, inject("IPasswordHasher")),
    __metadata("design:paramtypes", [Object, Object])
], RegisterClientUseCase);
export { RegisterClientUseCase };
//# sourceMappingURL=register-client.useCase.js.map