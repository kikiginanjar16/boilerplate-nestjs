import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthAudit } from 'src/entities/auth-audit.entity';
import logger from 'src/libraries/logger';
import { AppRequest, getIpAddress } from 'src/libraries/common/http.interface';

type AuditStatus = 'success' | 'failed';

interface AuditPayload {
  req: AppRequest;
  action: string;
  status: AuditStatus;
  userId?: string;
  identifier?: string;
  message?: string;
}

@Injectable()
export class AuthAuditUseCase {
  constructor(
    @InjectRepository(AuthAudit)
    private readonly authAuditRepository: Repository<AuthAudit>,
  ) {}

  async recordSafe(payload: AuditPayload): Promise<void> {
    try {
      await this.record(payload);
    } catch (error) {
      logger.error('[AUTH-AUDIT] ERROR', error);
    }
  }

  private async record(payload: AuditPayload): Promise<void> {
    const userAgent = payload.req.headers['user-agent'];
    const userAgentValue = Array.isArray(userAgent)
      ? userAgent.join(',')
      : userAgent || null;
    const audit = this.authAuditRepository.create({
      action: payload.action,
      status: payload.status,
      user_id: payload.userId,
      identifier: payload.identifier,
      message: payload.message,
      ip: getIp(payload.req),
      user_agent: userAgentValue,
    });

    await this.authAuditRepository.save(audit);
  }
}

const getIp = (req: AppRequest): string => getIpAddress(req);
