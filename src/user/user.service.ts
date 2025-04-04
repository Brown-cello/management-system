import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
// import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User )
    private userRepository:Repository<User >,
    private jwtService:JwtService
  ){}
  async create(dto:CreateUserDto){
    // const user = this.findByEmail(dto.email)
    // if(await user){
      // throw new BadRequestException('email already exists')
    // }
    //  const salt = await bcrypt.genSalt(10);
    // dto.password = await bcrypt.hash(dto.password, salt);

// const payload = { sub: 'user.id', email: 'user.email' };
const salt = await bcrypt.genSalt(10);
dto.password = await bcrypt.hash(dto.password, salt);

    const newCar = await this.userRepository.create(dto);
    return{
     userDetails : await this.userRepository.save(newCar),
    //  access_token: await this.jwtService.signAsync(payload),
    }
  }
   async findEmail(email:string){
    const userEmail =await this.userRepository.findOneBy({email})
    if(!userEmail){
      throw new HttpException('email already exists',400)
    }
    return userEmail
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

  async user(headers:any) : Promise<any>{
    const authorizationHeader =headers.authorization;
    if(authorizationHeader){
      const token = authorizationHeader.replace('Bearer ','');
      const secret = process.env.JWTSECRET;
      try{
        const decoded = this.jwtService.verify(token);
        let id =decoded["id"];

        let user=await this.userRepository.findOneBy({id});

        return {id:user?.id , name:user?.firstName,email:user?.email };
        
      }
      catch (error){
        throw new HttpException('invalid token',401);

      }

    }
    else {
      throw new HttpException('invalid or missing Bearers token',401);
    }
    
  }
}
