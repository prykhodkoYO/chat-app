import {
  Controller,
  Patch,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateProfileDto,
  ) {
    let avatarUrl = dto.avatar;

    if (file) {
      avatarUrl = await this.cloudinary.uploadImage(file);
    }

    return this.userService.updateProfile(req.user.id, {
      ...dto,
      avatar: avatarUrl,
    });
  }
}
