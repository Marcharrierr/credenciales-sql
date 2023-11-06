import { UserInterfaceActive } from './../common/interfaces/user-active.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll(@ActiveUser() user: UserInterfaceActive) {
    return this.usersService.findAll(user);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  findOne(@Param('id') id: number, @ActiveUser() user: UserInterfaceActive) {
    return this.usersService.findOne(+id, user);
  }

  // @Patch(':id')
  // @Auth(Role.USER)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  //}

  @Patch(':email')
  updatePassByEmail(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updatePassByEmail(email, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }



}
