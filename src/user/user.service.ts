import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
// import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User )
    private userRepository:Repository<User >,
    // private jwtService:JwtService
  ){}
  async create(dto:CreateUserDto){
    // const user = this.findByEmail(dto.email)
    // if(await user){
      // throw new BadRequestException('email already exists')
    // }
    //  const salt = await bcrypt.genSalt(10);
    // dto.password = await bcrypt.hash(dto.password, salt);

// const payload = { sub: 'user.id', email: 'user.email' };
    const newCar = await this.userRepository.create(dto);
    return{
     userDetails : await this.userRepository.save(newCar),
    //  access_token: await this.jwtService.signAsync(payload),
    }
  }
  

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
