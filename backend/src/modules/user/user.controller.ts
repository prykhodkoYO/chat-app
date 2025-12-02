import {
  Controller,
  Patch,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { multerAvatarOptions } from './upload.middleware';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('avatar', multerAvatarOptions))
  async updateProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateProfileDto,
  ) {
    let avatarUrl = dto.avatar ?? null;

    if (file) {
      avatarUrl = await this.cloudinary.uploadImage(file);
    }

    return this.userService.updateProfile(req.user.id, {
      name: dto.name ?? null,
      avatar: avatarUrl,
    });
  }
}
