import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.log(`New sign up. Username: ${authCredentialsDto.username}`);
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.log(`New sign in. Username: ${authCredentialsDto.username}`);
    const userEntity = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!userEntity)
      throw new UnauthorizedException('Invalid username, email or password');

    const { username, email } = userEntity;
    const payload: JwtPayloadInterface = { email, username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }
}
