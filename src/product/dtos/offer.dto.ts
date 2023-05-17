import { IS_LENGTH, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class OfferDto {
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    sku : number

    @IsNotEmpty()
    shipping_group : string
}