import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '@/users/entities/user.entity'
import { Not, Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    return `This action returns all users`
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'phoneNumber', 'birthday', 'hobby', 'gender', 'avatar', 'role', 'updatedAt']
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      const user = await this.findOne(id)
      if (updateUserDto.email) {
        const existingUser = await this.usersRepository.findOne({
          where: { email: updateUserDto.email, id: Not(id) }
        })
        if (existingUser) {
          throw new BadRequestException(`Email: ${updateUserDto.email} is already taken`)
        }
      }
      Object.assign(user, updateUserDto)
      const updatedUser = await this.usersRepository.save(user)
      return updatedUser
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
