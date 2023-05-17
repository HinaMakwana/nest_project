import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsOptional, IsPhoneNumber, Min } from "class-validator";
import { Address } from "src/schemas/common/address.schema";


export class CreateSellerDto {
    @IsNotEmpty()
    firstName : string
    @IsNotEmpty()
    lastName : string
    @IsNotEmpty()
    @IsEmail()
    email : string
    @IsNotEmpty()
    password : string
    @IsNotEmpty()
    bussinessName : string
    @IsNotEmpty()
    @IsPhoneNumber()
    contactNo : number
    @IsNotEmptyObject()
    address : Address
    @IsNotEmpty()
    LucidNo : number
    @IsOptional()
    VAT_NO : number

}