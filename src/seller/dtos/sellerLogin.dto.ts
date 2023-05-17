import { IsNotEmpty } from "class-validator"


export class sellerLoginDto {
    @IsNotEmpty()
    email : string
    @IsNotEmpty()
    password : string
}