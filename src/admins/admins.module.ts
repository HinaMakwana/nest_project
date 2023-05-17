import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminsController } from './controller/admins/admins.controller';
import { AdminsService } from './service/admins/admins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ADMIN_MODEL, AdminSchema } from 'src/schemas/admin.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { USER_MODEL, UserSchema } from 'src/schemas/users.schema';
import { AdminsMiddleware } from './middleware/admins/admins.middleware';

@Module({
  imports:[
    MongooseModule.forFeature([{ name : USER_MODEL, schema: UserSchema}]),
    MongooseModule.forFeature([{ name: ADMIN_MODEL, schema: AdminSchema }])
  ],
  controllers: [AdminsController],
  providers: [AdminsService,JwtService,UsersService]
})
export class AdminsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminsMiddleware)
    .exclude('admins/signup','admins/login')
    .forRoutes(AdminsController)

  }
}
