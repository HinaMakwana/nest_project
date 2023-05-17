import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';
import { RoleGuard } from 'src/users/guard/role/role.guard';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('profile')
@UseGuards(RoleGuard)
export class ProfileController {
    constructor(
        private readonly userService : UsersService
    ){}

    @Put(':id')
    updateProfile(@Body() updateUserDto : UpdateUserDto, @Param('id') id:string){
        this.userService.updateUser(id,updateUserDto)
        return {message : 'updated successfully'}
    }

    @Delete(':id')
    async deleteProfile(@Param('id') id:string) {
        await this.userService.deleteUser(id)
        return {message : 'user deleted successfully'}
    }

    @Get('view')
    async viewProfile(@Req() req) {
        const userId = req.userData.id
        const findUser = await this.userService.findById(userId)
        return findUser
    }
}
