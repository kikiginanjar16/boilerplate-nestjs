import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { encryptText, hashText } from 'pii-cyclops';
import { Repository } from 'typeorm';

import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { User } from 'src/entities/user.entity';
import { Common } from 'src/libraries/common';

interface GoogleTokenInfo {
  aud: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  sub?: string;
}

@Injectable()
export class GoogleOauthUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async doGoogleLogin(req: any, idToken: string): Promise<any> {
    const tokenInfo = await this.verifyGoogleToken(idToken);
    const email = tokenInfo.email;

    if (!email) {
      throw new Error(MessageHandler.ERR001);
    }

    const emailVerified =
      tokenInfo.email_verified === true || tokenInfo.email_verified === 'true';
    if (!emailVerified) {
      throw new Error(MessageHandler.ERR001);
    }

    const emailHash = hashText(email);
    const user = await this.userRepository.findOne({
      where: { email_hash: emailHash },
    });

    let savedUser = user;
    if (!user) {
      const passwordRandom = randomBytes(24).toString('hex');
      const hashedPassword = await new Common().hashPassword(passwordRandom);
      const encryptedEmail = encryptText(email, Constant.JWT_SECRET).encrypted;
      const newUser = this.userRepository.create({
        name: tokenInfo.name || email,
        email: encryptedEmail,
        email_hash: emailHash,
        avatar: tokenInfo.picture || Constant.DEFAULT_AVATAR,
        password: hashedPassword,
        phone: null,
      });
      if (req?.fingerprint?.hash) {
        newUser.fingerprint = req.fingerprint.hash;
      }
      savedUser = await this.userRepository.save(newUser);
    }

    if (user && req?.fingerprint?.hash) {
      await this.userRepository.update(savedUser.id, {
        fingerprint: req.fingerprint.hash,
      });
    }
    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      role: savedUser.role,
      avatar: savedUser.avatar,
    };
    const token = jwt.sign(payload, Constant.JWT_SECRET, { expiresIn: '7d' });
    return {
      fingerprint: true,
      user: { id: savedUser.id, name: savedUser.name, avatar: savedUser.avatar },
      token,
    };
  }

  private async verifyGoogleToken(idToken: string): Promise<GoogleTokenInfo> {
    try {
      const response = await axios.get<GoogleTokenInfo>(
        'https://oauth2.googleapis.com/tokeninfo',
        {
          params: { id_token: idToken },
        },
      );

      if (response.data?.aud !== Constant.GOOGLE_CLIENT_ID) {
        throw new Error(MessageHandler.ERR001);
      }

      return response.data;
    } catch (error) {
      throw new Error(MessageHandler.ERR001);
    }
  }
}
