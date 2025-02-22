import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MessageHandler from 'src/common/message';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import Constant from 'src/common/constant';
import * as bcrypt from 'bcrypt';
import { ADMIN } from 'src/common/constant/constant';

@Injectable()
export class LoginUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async doLoginAdmin(req : any, body: any): Promise<any> {
        try {
            const { phone, password } = body;
            const user = await this.userRepository.findOne({ where: { phone: phone, type: ADMIN } });
            if (!user) {
                throw new Error(MessageHandler.ERR001);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error(MessageHandler.ERR001);
            }
            
            const payload = { id: user.id, phone: user.phone, name: user.name };
            const token = jwt.sign(payload, Constant.JWT_SECRET, { expiresIn: '7d' });
            return { fingerprint: true, payload, token };
        } catch (error) {
            throw error;
        }
    }

    async doLogin(req : any, body: any): Promise<any> {
        try {
            const { phone, password } = body;
            const user = await this.userRepository.findOne({ where: { phone: phone} });
            if (!user) {
                throw new Error(MessageHandler.ERR001);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error(MessageHandler.ERR001);
            }

            await this.userRepository.update(user.id, { fingerprint: req.fingerprint.hash });
            const payload = { id: user.id, phone: user.phone, name: user.name };
            const token = jwt.sign(payload, Constant.JWT_SECRET, { expiresIn: '7d' });
            return { fingerprint: true, payload, token };
        }catch (error) {
            throw error;
        }
    }
}
