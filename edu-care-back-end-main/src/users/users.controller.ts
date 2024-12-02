import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Users } from '@/users/entities/user.entity'
import { BaseResponse } from '@/shared/res/base-response'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<BaseResponse<Users>> {
    const user = await this.usersService.findOne(id)
    return new BaseResponse<Users>(`Get User By ID: ${id} successfully`, user)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<BaseResponse<Users>> {
    const userUpdate = await this.usersService.update(id, updateUserDto)
    return new BaseResponse<Users>(`Update User ID: ${id} successfully`, userUpdate)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
