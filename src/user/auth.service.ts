import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(token: User): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }
}