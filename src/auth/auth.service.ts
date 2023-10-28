import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './Schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { s3Service } from 'src/util/s3';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly appService: s3Service,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('Story').exec();
  }

  async update(id: string, user: User, file): Promise<User> {
    // Verificar si se intenta cambiar la contraseña o el nombre de usuario
    if (user.password) {
      throw new Error('No puedes cambiar la contraseña directamente');
    }

    if (user.username) {
      throw new Error('No puedes cambiar el nombre de usuario');
    }

    if (file) {
      const userDelete = await this.userModel.findById(id).exec();
      if (userDelete.image?.key) {
        this.appService.deleteFile(userDelete.image.key);
      }
      const image = await this.appService.uploadFile(file);
      if (image) {
        user.image = {
          location: image.Location,
          key: image.Key,
        };
      } else {
        throw new Error('Error al cargar la imagen');
      }
    }
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      username: username,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from Google';
    }

    const user = await this.userModel
      .findOne({ username: req.user.email })
      .exec();
    if (!user) {
      const createdUser = new this.userModel({
        username: req.user.email,
        // Puedes configurar la contraseña para el usuario aquí o dejarla vacía
      });
      await createdUser.save();
    }
    const payload = { username: req.user.email, sub: req.user.id };
    return {
      message: 'User information from Google',
      access_token: this.jwtService.sign(payload),
    };
  }
}
