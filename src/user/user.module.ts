import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProductModule } from 'src/product/product.module';


// forwardRef sirve para evitar la circular dependencies, se tiene que ocupar en ambas clases para evitar este problema(mas que un problema es para mantener estructura de injecciones)
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ProductModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule]
})
export class UserModule { }
