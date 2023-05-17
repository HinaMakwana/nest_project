import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { doc } from 'prettier';
import { STATUS } from 'src/constants';
import { USER_MODEL, User, UserDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { LoginUserDto } from 'src/users/dtos/loginUser.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(USER_MODEL)
        private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
        ) {}

    async create(createUserDto : CreateUserDto) {
        try {
            // const password = await encodePassword(createUserDto.password)
            // const addUser = await this.userModel.create({...createUserDto, password})
            const addUser = await this.userModel.create(createUserDto)
            return addUser
        } catch(err){
            throw new ConflictException({
                error : 'email and username must be unique',
                message : 'value conflict'
            })
        }
    }
    async login(loginUserDto : LoginUserDto) {
        const { email, password } = loginUserDto
        const user = await this.userModel.findOne({email:email}, "+password")
        if(!user){
            throw new NotFoundException('user not found')
        }
        const isMatch = await compare(password,user.password)
        if(!isMatch){
            throw new UnauthorizedException('invalid password')
        }
        const payload = { id : user._id, email : user.email, status : user.status}
        const token = await this.jwtService.signAsync(payload, {secret : process.env.JWT_KEY, expiresIn: '1d'})
        await this.userModel.updateOne({email: email},{token: token})
        return { token : token}
    }
    async findAll() : Promise<User[]> {
        const allUser = await this.userModel.find()
        return allUser
    }
    async findByUsername(username: string) {
        const user = await this.userModel.findOne({username : username})
        if(!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }
    async findById(id: string) {
        const user = await this.userModel.findByIdAndUpdate(id, {token : null})
        return user
    }
    async updateUser(id : string, updateUserDto : UpdateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id,updateUserDto)
        return user
    }
    async deleteUser(id : string) {
        console.log(id);
        const user = await this.userModel.updateOne({ _id : id, status : STATUS.DELETED})
        return user
    }
    async search(name : string) {
        const users : UserDocument[] = await this.userModel.find({
            username : new RegExp(name, 'i')
        })
        if(!users[0]) {
            throw new NotFoundException({
                message : 'Username not found',
                error : 'No result'

            })
        }
        return users
    }

}
