import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/admins/dtos/login.dto';
import { SignUpDto } from 'src/admins/dtos/signup.dto';
import { STATUS } from 'src/constants';
import { ADMIN_MODEL, AdminDocument } from 'src/schemas/admin.schema';
import { USER_MODEL, UserDocument } from 'src/schemas/users.schema';
import { comparePassword, encodePassword } from 'src/util/bcrypt';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(ADMIN_MODEL)
        private readonly adminModel : Model<AdminDocument>,
        @InjectModel(USER_MODEL)
        private readonly userModel : Model<UserDocument>,
        private readonly jwtService : JwtService,
    ) {}

    async signUp(signUpDto : SignUpDto) {
        const password =await encodePassword(signUpDto.password)
        const data = await this.adminModel.create({...signUpDto, password})
        return data
    }
    async login(loginDto : LoginDto) {
        const { email, password } = loginDto
        const admin = await this.adminModel.findOne({email : email})
        if(!admin){
            throw new NotFoundException('Admin not found')
        }
        const isMatch = await comparePassword(password, admin.password)
        if(!isMatch) {
            throw new NotImplementedException('Password not match enter correct password')
        }
        const token = await this.jwtService.signAsync({id : admin._id, email : email},{ secret : process.env.JWT_KEY, expiresIn : '10h'})
        await this.adminModel.updateOne({email : email},{token : token})
        return { token : token }
    }
    async findAdmin(id) {
        const findAdmin = await this.adminModel.findByIdAndUpdate(id, { token : null })
        return findAdmin
    }
    async makeInactive(id,status) {
        let statusType
        if(status == 'ACTIVE'){
            statusType = STATUS.INACTIVE
        } else {
            statusType = STATUS.ACTIVE
        }
        await this.userModel.updateOne({_id : id}, {status : statusType})
        return{ message : `user status is ${statusType}`}
    }
}
