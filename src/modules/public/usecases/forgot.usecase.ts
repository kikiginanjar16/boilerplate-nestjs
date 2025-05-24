import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SaungwaApiNotification } from 'src/libraries/saungwa';
import { Repository } from 'typeorm';
import { Common } from 'src/libraries/common';
import MessageHandler from 'src/common/message';

@Injectable()
export class ForgotUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async doForgotPassword(email: string): Promise<any> {
        try {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const user = await this.userRepository.findOne({ where: { email: email } });
            if (!user) {
                throw new Error(MessageHandler.ERR005);
            }

            user.password = new Common().hashPassword(generatedPassword);
            console.log('Generated password:', generatedPassword);

            await this.userRepository.save(user);
            const message = `Silahkan login dengan menggunakan password tersebut ${generatedPassword}, jangan lupa untuk segera menggantinya.`;
            await new SaungwaApiNotification().sendWhatsAppNotification(user.phone, message);
            return MessageHandler.SUC005;
        } catch (error) {
            console.error('Error sending password to WhatsApp:', error);
        }

        return MessageHandler.ERR005;
    }
}