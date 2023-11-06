import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/rol.enum';
import { UserInterfaceActive } from './../common/interfaces/user-active.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);

  }

  // retornará si existe o no el user en la base de datos (login y register)
  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });

  }

  async findByEmailPass(email: string,) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password',],
    });

  }

  async findAll(user: UserInterfaceActive) {
    if (user.role === Role.ADMIN) {
      return await this.userRepository.find();
    }
    throw new UnauthorizedException('Usted no tiene permisos para realizar esta acción')

  }

  async findOne(id: number, user: UserInterfaceActive) {
    if (user.role === Role.ADMIN) {
      return await this.userRepository.findOneBy({ id })
    }
    throw new UnauthorizedException('Usted no tiene permisos para realizar esta acción')
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.userRepository.update(id, updateUserDto)
  // }


  async updatePassByEmail(email: string, updateUserDto: UpdateUserDto) {
    // Buscar al usuario por correo electrónico
    const user = await this.userRepository.findOne({ where: { email: email } });

    // Si el usuario existe, actualizar su contraseña
    if (user) {
      const hashedPassword = await bcryptjs.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
      return await this.userRepository.update(user.id, updateUserDto);
    } else {
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({ id });
  }



}
