import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from 'src/admins/dtos/login.dto';
import { SignUpDto } from 'src/admins/dtos/signup.dto';
import { AdminsService } from 'src/admins/service/admins/admins.service';
import { RoleGuard } from 'src/users/guard/role/role.guard';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('admins')
export class AdminsController {
    constructor(
        private readonly adminService : AdminsService,
        private readonly userService : UsersService
    ) {}

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() signUpDto : SignUpDto) {
        return this.adminService.signUp(signUpDto)
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() loginDto : LoginDto) {
        return this.adminService.login(loginDto)
    }

    @Post('logout')
    async logout(@Req() req) {
        const adminId = req.adminData.id
        await this.adminService.findAdmin(adminId)
        return 'logout successfully'
    }

    @Get()
    async getAll(@Req() req){
        return await this.userService.findAll()
    }

    @Patch(':id')
    async makeInactive(@Param('id') id:string) {
        const findUser = await this.userService.findById(id)
        const data = await this.adminService.makeInactive(id,findUser.status)
        return data
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id)
        return { message : 'User is deleted'}
    }



}
