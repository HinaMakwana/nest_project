import { IsNotEmpty } from "class-validator";


export class ShippingDto {
    @IsNotEmpty()
    name : string

    @IsNotEmpty()
    address : string

    @IsNotEmpty()
    Region : string

    @IsNotEmpty()
    transit_time : number

    @IsNotEmpty()
    shipping_cost : number

    @IsNotEmpty()
    shipping_partner : string
}