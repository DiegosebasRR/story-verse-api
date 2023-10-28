import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  UseInterceptors,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './Schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.update(id, user, file);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: User) {
    const { username, password } = user;
    return this.authService.register(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
