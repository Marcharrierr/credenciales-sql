import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { RegisterDto } from '../auth/dto/register.dto';
import { DataSource } from 'typeorm';
import { UserInterfaceActive } from '../common/interfaces/user-active.interface';



@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource
  ) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.usersService.register(registerDto);
  }

  @Get()
  //@Auth(Role.ADMIN)
  findAll(@ActiveUser() user: UserInterfaceActive, @Query('pages') pages: number, @Query('items') items: number) {
    return this.usersService.findAll(pages, items);
  }

  @Get(':id')
  //@Auth(Role.ADMIN)
  findById(@Param('id') id: number, @ActiveUser() user: UserInterfaceActive) {
    return this.usersService.findOne(id, user);
  }

  @Put(':id')
  // @Auth(Role.USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(+id, updateUserDto);
  }

  // @Patch(':id')
  // // @Auth(Role.USER)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateById(+id, updateUserDto);
  // }

  @Patch(':email')
  updatePassByEmail(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updatePassByEmail(email, updateUserDto);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }


  @Delete(':id')
  //@Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }



}
