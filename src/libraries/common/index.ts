import * as bcrypt from 'bcrypt';

import Constant from "src/common/constant";

export class Common {
    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Constant.SALT_ROUNDS);
    }
}
