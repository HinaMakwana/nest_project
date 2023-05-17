import { IsNotEmpty } from "class-validator";


export class StockDto {
    @IsNotEmpty()
    product_name : string

    @IsNotEmpty()
    image_url : string

    @IsNotEmpty()
    gtin : number

    @IsNotEmpty()
    quantity : number

    @IsNotEmpty()
    price : number
}