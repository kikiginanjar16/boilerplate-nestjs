import Constant from "src/common/constant";
import * as bcrypt from 'bcrypt';

export class Common {
    constructor() {
        // Initialization code here
    }

    // Add common methods here
    public hashPassword(password: string): string {
        return bcrypt.hash(password, Constant.SALT_ROUNDS);
    }
}