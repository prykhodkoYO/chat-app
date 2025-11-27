import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, ProfileStatus } from './user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('User not found');

    let avatarUrl = user.avatarUrl;

    if (dto.avatar) {
      const upload = await cloudinary.uploader.upload(dto.avatar, {
        folder: 'avatars',
        transformation: [{ width: 400, height: 400, crop: 'fill' }],
      });

      avatarUrl = upload.secure_url;
    }

    user.name = dto.name ?? user.name;
    user.avatarUrl = avatarUrl;
    user.profileStatus = ProfileStatus.COMPLETED;

    await this.userRepo.save(user);

    return {
      message: 'Profile updated',
      user: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        profileStatus: user.profileStatus,
      },
    };
  }
}
