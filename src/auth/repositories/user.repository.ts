import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUser(authCredentialDto: AuthCredentialsDto): Promise<UserEntity> {
    const { username, email } = authCredentialDto;
    const usernameUser = await this.findOne({ username });
    if (usernameUser) return usernameUser;

    const emailUser = await this.findOne({ email });
    if (emailUser) return emailUser;

    return null;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const { password } = authCredentialsDto;
    const user = await this.findUser(authCredentialsDto);

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, email, password } = authCredentialsDto;

    try {
      const user = new UserEntity();
      user.username = username;
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
    } catch (error) {
      const { code } = error;
      if (code === '23505') {
        throw new ConflictException('username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
