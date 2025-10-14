import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MessageHandler from 'src/common/message';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import Constant from 'src/common/constant';
import * as bcrypt from 'bcrypt';
import { ADMIN } from 'src/common/constant/constant';
import { hashText } from 'pii-cyclops';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async doLoginAdmin(req : any, body: LoginDto): Promise<any> {
        try {
            const { username, password } = body;
            const email_hash = hashText(username);
            const user = await this.userRepository.findOne({ where: { email_hash, role: ADMIN } });
            if (!user) {
                throw new Error(MessageHandler.ERR001);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error(MessageHandler.ERR001);
            }
            
            const payload = { id: user.id, phone: user.phone, name: user.name, role: user.role };
            const token = jwt.sign(payload, Constant.JWT_SECRET, { expiresIn: '7d' });
            return { fingerprint: true, user: { id: user.id, phone: user.phone, name: user.name }, token };
        } catch (error) {
            throw error;
        }
    }

    async doLogin(req: any, body: LoginDto): Promise<any> {
        try {
            const { username, password } = body;
            const email_hash = hashText(username);
            const user = await this.userRepository.findOne({ where: { email_hash } });

            if (!user) {
                throw new Error(MessageHandler.ERR001);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error(MessageHandler.ERR001);
            }

            await this.userRepository.update(user.id, { fingerprint: req.fingerprint.hash });
            const payload = { id: user.id, phone: user.phone, name: user.name, role: user.role };
            const token = jwt.sign(payload, Constant.JWT_SECRET, { expiresIn: '7d' });
            return { fingerprint: true, user: { id: user.id, name: user.name, phone: user.phone}, token };
        }catch (error) {
            throw error;
        }
    }
}
