import { RefreshTokenModel } from "../../../frameworks/database/mongodb/model/refresh-token.model.js";
import { BaseRepository } from "../base.repository.js";
export class RefreshTokenRepository extends BaseRepository {
    constructor() {
        super(RefreshTokenModel);
    }
    async revokeRefreshToken(token) {
        await RefreshTokenModel.deleteOne({ token });
    }
}
//# sourceMappingURL=refresh-token.repository.js.map