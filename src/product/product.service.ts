import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { ProductCreateDto } from './dto/product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>, @InjectRepository(User) private userRepository: Repository<User>) { }

    async createProduct(productData: ProductCreateDto, id: string) {
        try {
            const seaUser = await this.userRepository.findOne(id);

            if (!seaUser) {
                throw { ok: false, message: "incorrect id", status: 404 }
            }
            const genId = v4()

            const createdProduct = this.productRepository.create({ ...productData, id: genId, user: seaUser });//no sé como funciona, pero user(prop para hacer relacion) tomara el id de seaUser porque al hacer joinColumn por defecto toma de referencia el id y crea un nuevo campo

            if (!createdProduct) {
                throw { ok: false, message: "error in create product", status: 403 }
            }

            await createdProduct.save()

            return { ok: true, message: "product was created", data: createdProduct };
        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }
    }


    async getProduct(id: string) {
        try {
            const product = await this.productRepository.findOne(id)
            if (!product) {
                throw { ok: false, message: "product not found", status: 404 }
            }
            return { ok: true, message: "product found", data: product };
        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }
    }

    async getProducts(): Promise<Product[]> {
        const users = await this.productRepository.find()
        return users;
    }
}
