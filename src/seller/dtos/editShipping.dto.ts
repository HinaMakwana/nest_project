import { IsOptional } from "class-validator";


export class EditShippingDto {
    @IsOptional()
    name : string

    @IsOptional()
    address : string

    @IsOptional()
    Region : string

    @IsOptional()
    transit_time : number

    @IsOptional()
    shipping_cost : number

    @IsOptional()
    shipping_partner : string
}