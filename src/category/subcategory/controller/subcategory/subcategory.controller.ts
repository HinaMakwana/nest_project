import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubcategoryService } from '../../service/subcategory/subcategory.service';
import { SubCategoryDto } from 'src/category/dto/subcategory.dto';

@Controller('subcategory')
export class SubcategoryController {
    constructor(private readonly subcategoryService : SubcategoryService){}

    @Post()
    async createCategory(@Body() subcategoryDto : SubCategoryDto) {
        return this.subcategoryService.createCategory(subcategoryDto)
    }

    @Get()
    async listAll() {
        return this.subcategoryService.listAll()
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        return this.subcategoryService.deleteCategory(id)
    }

    @Patch(':id')
    async updateCategory(@Param('id') id : string, @Body('name') name : string) {
        return this.subcategoryService.updateCategory(id,name)
    }
}
