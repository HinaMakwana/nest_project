import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator"
import { TYPE } from "src/constants"
import { Address } from "src/schemas/common/address.schema"

export class CreateUserDto {
    @IsNotEmpty()
    username : string
    @IsNotEmpty()
    firstName : string
    @IsNotEmpty()
    lastName : string
    @IsNotEmpty()
    @IsEmail()
    email : string
    @IsNotEmpty()
    password : string
    @IsOptional()
    @IsPhoneNumber()
    phoneNo : number
    @IsOptional()
    address : Address
    @IsOptional()
    type : TYPE
}