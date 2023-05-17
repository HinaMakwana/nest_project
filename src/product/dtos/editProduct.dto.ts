import { IsNumberString, IsOptional} from "class-validator";
import { Category } from "src/schemas/category.schema";
import { subCategory } from "src/schemas/subCategory.schema";

export class editProductDto {
    @IsOptional()
    product_name : string

    @IsOptional()
    brand_name : string

    @IsOptional()
    image_url : string

    @IsOptional()
    @IsNumberString()
    price : number

    @IsOptional()
    condition : string

    @IsOptional()
    description : string

    @IsOptional()
    quantity : number

}