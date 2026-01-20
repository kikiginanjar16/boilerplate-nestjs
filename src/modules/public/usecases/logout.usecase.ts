import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';

import { RevokedToken } from 'src/entities/revoked-token.entity';

@Injectable()
export class LogoutUseCase {
  constructor(
    @InjectRepository(RevokedToken)
    private readonly revokedTokenRepository: Repository<RevokedToken>,
  ) {}

  async revokeToken(token: string, payload: any): Promise<void> {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const existingToken = await this.revokedTokenRepository.findOne({
      where: { token_hash: tokenHash },
    });

    if (existingToken) {
      return;
    }

    const expiresAt =
      payload?.exp && typeof payload.exp === 'number'
        ? new Date(payload.exp * 1000)
        : null;

    const revokedToken = this.revokedTokenRepository.create({
      token_hash: tokenHash,
      user_id: payload?.id,
      expires_at: expiresAt,
    });

    await this.revokedTokenRepository.save(revokedToken);
  }
}
