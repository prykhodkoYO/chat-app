import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
    private cfg: ConfigService,
  ) {}

  private async generateTokens(user: User) {
    const payload = { id: user.id, phone: user.phone };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.cfg.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.cfg.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, token: string) {
    const hash = await bcrypt.hash(token, 10);
    await this.usersRepo.update(userId, { refreshToken: hash });
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { phone: dto.phone } });
    if (!user) throw new UnauthorizedException('Invalid phone or password');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid phone or password');

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'Login successful',
      ...tokens,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
      },
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersRepo.findOne({
      where: { phone: dto.phone },
    });

    if (existing) {
      throw new BadRequestException('This phone number is already registered');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepo.create({
      phone: dto.phone,
      name: null,
      password: hashed,
    });

    await this.usersRepo.save(user);

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'User registered successfully',
      ...tokens,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
      },
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Missing refresh token');

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.cfg.get('REFRESH_TOKEN_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersRepo.findOne({
      where: { id: payload.id },
    });

    if (!user || !user.refreshToken) throw new UnauthorizedException('Invalid refresh token');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new UnauthorizedException('Invalid refresh token');

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.usersRepo.update(userId, { refreshToken: null });
    return { message: 'Logged out' };
  }
}
