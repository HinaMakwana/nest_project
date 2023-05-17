import { IsNotEmpty, IsNumberString, IsOptional, Length } from "class-validator";
import { Category } from "src/schemas/category.schema";
import { subCategory } from "src/schemas/subCategory.schema";

export class createProductDto {
    @IsNotEmpty()
    product_name : string

    @IsNotEmpty()
    brand_name : string

    @IsNotEmpty()
    manufacturer : string

    @IsOptional()
    image_url : string

    @IsNotEmpty()
    @IsNumberString()
    price : number

    @IsNotEmpty()
    categoryId : Category

    @IsOptional()
    subCategoryId : subCategory

    @IsNotEmpty()
    @Length(13)
    gtin : number

    @IsOptional()
    condition : string

    @IsOptional()
    description : string

    @IsOptional()
    quantity : number

}