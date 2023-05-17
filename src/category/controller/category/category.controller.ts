import { Body, Controller, Delete, Get, NotAcceptableException, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CategoryService } from 'src/category/service/category/category.service';
import path = require('path') ;

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService : CategoryService){}

    @Post()
    @UseInterceptors(FileInterceptor('photo', {
        storage : diskStorage({
            destination : './files',
            filename : (req,file,cb) => {
                const filename = file.originalname
                cb(null,filename)
            },
        }),
        fileFilter: (req,file,cb) => {
            const fileType = file.mimetype.slice(0,5)
            if(fileType !== 'image') {
                return cb(null,false)
            }
            cb(null,true)
        }
    }))
    addCategory(@Body() categoryDto : CategoryDto, @UploadedFile() photo : Express.Multer.File) {
        try {
            categoryDto.photo = photo.path
            return this.categoryService.addCategory(categoryDto)
        }
        catch(err) {
            throw new NotAcceptableException('extension of photo is not acceptable')
        }
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id)
    }

    @Patch(':id')
    updateCategory(@Param('id') id:string, @Body('name') name : string) {
        return this.categoryService.updateCategory(id,name)
    }

    @Get()
    listAll() {
        return this.categoryService.listCategory()
    }
}
