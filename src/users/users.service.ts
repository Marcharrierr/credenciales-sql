import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/rol.enum';
import { UserInterfaceActive } from './../common/interfaces/user-active.interface';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);

  }


  // Registrar usuario
  async register({ name, lastName, rut, email, password, rutEmpresa }: RegisterDto) {

    if (!rut.match(/^[\d]{7,8}-[\dK]$/)) {
      throw new BadRequestException('El RUT debe tener al menos 7 números a la izquierda del guión y un dígito a la derecha del guión');
    }

    const rutParts = rut.split('-');
    const rutN = rutParts[0]; // El número entero
    const dv = rutParts[1]; // El número a la derecha del guión medio


    if (!dv.match(/^[0-9K]$/)) {
      throw new BadRequestException('El dv debe ser un número del 0 al 9 o una letra K mayúscula');
    }
    const rutEmpresaParts = rutEmpresa.split('-');
    const rutEmpresaNumber = rutEmpresaParts[0].replace(/\./g, ''); // El número entero sin puntos

    const userByEmail = await this.findByEmail(email);
    const userByRut = await this.findByRut(rutN);

    if (userByRut) {
      throw new BadRequestException('Rut ya existe');
    }
    if (userByEmail) {
      throw new BadRequestException('Correo ya existe');
    }


    const client = await this.dataSource.query(
      `SELECT * FROM client WHERE rut = ?`,
      [rutEmpresaNumber]
    );

    if (!client || client.length === 0) {
      throw new BadRequestException('No existe cliente con ese rut');
    }
    const client_id = Number(client[0].id);

    if (isNaN(client_id)) {
      throw new BadRequestException('clientId no es un número válido');
    }

    await this.userRepository.save(
      {
        name, lastName, rut: rutN.toString(), dv: dv, email,
        password: await bcryptjs.hash(password, 10),
        client_id,
      });
    return "Usuario creado con éxito"
    // Mensaje de éxito
  }




  // retornará si existe o no el user en la base de datos (login y register)
  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });

  }

  async findByRut(rut: string) {
    return this.userRepository.findOne({ where: { rut } });
  }


  async findByEmailPass(email: string,) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'lastName', 'email', 'password',],
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['name', 'lastName']
    })
  }


  async findAll(page: number, items: number) {

    // Si items es null, undefined o no es un número, se establece a 100
    items = (typeof items === 'number' && !isNaN(items)) ? items : 100;
    // Si page es null, undefined o no es un número, se establece a 1
    page = (typeof page === 'number' && !isNaN(page)) ? page : 1;

    const skip = (page - 1) * items;

    const users = await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'DESC')
      .take(items)
      .skip(skip)
      .getMany();
    return users;
  }


  async findOne(id: number, user: UserInterfaceActive) {
    //if (user.role === Role.ADMIN) {}
    return await this.userRepository.findOneBy({ id })

    throw new UnauthorizedException('Usted no tiene permisos para realizar esta acción')
  }


  // Actualizar pass según correo
  async updatePassByEmail(email: string, updateUserDto: UpdateUserDto) {
    // Buscar al usuario por correo electrónico
    const user = await this.userRepository.findOne({ where: { email: email } });


    // Si el usuario existe, actualizar su contraseña
    if (user) {
      const hashedPassword = await bcryptjs.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
      return await this.userRepository.update(user.id, updateUserDto);
    } else {
      throw new BadRequestException('Error');
    }
  }


  async updateById(id: number, updateUserDto: UpdateUserDto) {
    // Buscar al usuario por correo electrónico
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({ id });
  }


}

