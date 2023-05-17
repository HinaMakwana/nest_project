import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { LoginUserDto } from 'src/users/dtos/loginUser.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';
import { RoleGuard } from 'src/users/guard/role/role.guard';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}
    @Post('signup')
    @UsePipes(ValidationPipe)
    create(@Body() createUserdto : CreateUserDto){
        return this.userService.create(createUserdto)
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() loginUserdto : LoginUserDto) {
        return this.userService.login(loginUserdto)
    }

    @Get('findone')
    @UseGuards(RoleGuard)
    getByUsername(@Body('username') username: string, @Req() req){
        return this.userService.findByUsername(username)
    }

    @Get('search/:name')
    @UseGuards(RoleGuard)
    findByName(@Param('name') name : string) {
        return this.userService.search(name)
    }

    @Post('logout')
    async logout(@Req() req) {
        const userId = req.userData.id
        await this.userService.findById(userId)
        return 'logout successfully'
    }
}
