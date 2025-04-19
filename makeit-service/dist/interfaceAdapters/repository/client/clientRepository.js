import { ClientModel } from "../../../frameworks/database/mongodb/model/clientModel.js";
export class clientRepository {
    async createClient(client) {
        return await ClientModel.create(client);
    }
    async findByEmail(email) {
        return await ClientModel.findOne({ email: email });
    }
}
//# sourceMappingURL=clientRepository.js.map