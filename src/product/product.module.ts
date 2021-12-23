import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => UserModule)],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule]
})
export class ProductModule { }
