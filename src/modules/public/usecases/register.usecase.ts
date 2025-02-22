import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    async doRegister(registerDto: RegisterDto): Promise<User> {
        try {
            const check = await this.userRepository.findOne({ 
                where: { phone: registerDto.phone },
             });

            if (check) {
                throw new Error(MessageHandler.ERR006);
            }

            const user = new User();
            user.name = registerDto.name;
            user.phone = registerDto.phone;
            user.avatar = Constant.DEFAULT_AVATAR;
            user.password =  await new Common().hashPassword(registerDto.password);
            return this.userRepository.save(user);
        } catch (error) {
            throw error;   
        }
    }
}

interface RegisterDto {
    name: string;
    phone: string;
    password: string;
    company:any
}
