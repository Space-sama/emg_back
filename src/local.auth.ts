import { AdminService } from './admin/admin.service';

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common/decorators';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AdminService) {
    super();
  }

  async validate(email: string): Promise<any> {
    const user = await this.authService.getOneByMail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log("success");
    return user;
  }
}