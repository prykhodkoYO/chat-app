import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({
      where: { phone: dto.phone },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const token = await this.jwtService.signAsync(
      { id: user.id, phone: user.phone },
      { expiresIn: '1d' },
    );

    return {
      message: 'Login successful',
      token,
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

    const token = await this.jwtService.signAsync(
      { id: user.id, phone: user.phone },
      { expiresIn: '1d' },
    );

    return {
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
      },
    };
  }
}
