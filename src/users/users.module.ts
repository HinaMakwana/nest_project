import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './service/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from 'src/schemas/users.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminsMiddleware } from 'src/admins/middleware/admins/admins.middleware';
import { AdminsModule } from 'src/admins/admins.module';
import { ADMIN_MODEL, AdminSchema } from 'src/schemas/admin.schema';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { ProfileController } from './controller/profile/profile.controller';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name : USER_MODEL, schema: UserSchema}])
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService,JwtService]
})
export class UsersModule implements NestModule{
 configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .exclude('users/signup','users/login')
    .forRoutes(UsersController,ProfileController)
 }
}
