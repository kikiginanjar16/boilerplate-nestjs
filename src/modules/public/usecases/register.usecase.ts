import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { encryptText, hashText } from 'pii-cyclops';
import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { User } from 'src/entities/user.entity';
import { Common } from 'src/libraries/common';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async doRegister(registerDto: any): Promise<User> {
        try {
            const check = await this.userRepository.findOne({ 
                where: { email_hash: registerDto.email },
             });

            if (check) {
                throw new Error(MessageHandler.ERR006);
            }

            const name = registerDto.name;
            const email = encryptText(registerDto.email, Constant.JWT_SECRET).encrypted;
            const phone = encryptText(registerDto.phone, Constant.JWT_SECRET).encrypted;
            const address = encryptText(registerDto.address, Constant.JWT_SECRET).encrypted;
            const email_hash = hashText(registerDto.email);
            const user = new User();
            
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.address = address;
            user.email_hash = email_hash;
            user.avatar = Constant.DEFAULT_AVATAR;
            user.password = await new Common().hashPassword(registerDto.password);
            return this.userRepository.save(user);
        } catch (error) {
            throw error;   
        }
    }
}
