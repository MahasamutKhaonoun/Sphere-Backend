import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return { user, message: 'User created successfully' };
    } catch (error) {
      return { error: 'Failed to create user' };
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { users };
  }

  //----------------------<Message>---------------------------//
  @Get('messages')
  async findAllMessages() {
      const messages = await this.usersService.findAllMessages();
      return { messages };
  }
  //----------------------<Message>---------------------------//

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { user };
    } catch (error) {
      return { error: 'User not found' };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { user, message: 'User updated successfully' };
    } catch (error) {
      return { error: 'Failed to update user' };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(+id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { user, message: 'User deleted successfully' };
    } catch (error) {
      return { error: 'Failed to delete user' };
    }
  }


}

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

