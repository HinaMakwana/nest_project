import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsOptional, IsPhoneNumber, Min } from "class-validator";
import { Address } from "src/schemas/common/address.schema";


export class UpdateSellerDto {
    @IsOptional()
    firstName : string
    @IsOptional()
    lastName : string
    @IsOptional()
    bussinessName : string
    @IsOptional()
    @IsPhoneNumber()
    contactNo : number
    @IsOptional()
    address : Address

}