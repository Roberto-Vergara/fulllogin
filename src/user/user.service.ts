import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from "bcrypt"
import { v4 } from 'uuid';
import { Product } from 'src/product/product.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Product) private productRepository: Repository<Product>) {

    }

    async createUser(userData: UserCreateDto) {
        try {
            const hashPass = await bcrypt.hash(userData.password, 8)
            const genId = v4()

            const createdUser = this.userRepository.create({ ...userData, password: hashPass, id: genId });
            if (!createdUser) {
                throw { ok: false, message: "error in create user", status: 403 }
            }

            await createdUser.save()

            return { ok: true, message: "user was created", data: createdUser };
        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }
    }

    async getUser(id: string) {
        try {
            const user = await this.userRepository.findOne(id)
            if (!user) {
                throw { ok: false, message: "user not found", status: 404 }
            }
            const { password, role, email, created_at, updated_at, ...rest } = user;
            return { ok: true, message: "user found", data: rest };
        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users;
    }


    async deleteUser(id: string) {
        try {
            await this.userRepository.delete({ id })
        } catch (error) {
            throw new HttpException({ ok: false, message: "user not found" }, 404)
        }
    }

    // este devuelve datos sensibles del usuario necesarios para poder hacer authentication con passport-local
    async findUser(email: string) {
        try {
            const user = await this.userRepository.findOne({ email });
            if (!user) {
                throw { ok: false, message: "user not found", status: 404 }
            }
            const { city, created_at, updated_at, ...rest } = user;
            // la idea es que retorne password, email, name, role y id
            return rest;
        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }
    }

    async getProductsUser(id: string) {
        try {
            const user = await this.userRepository.findOne(id);
            if (!user) {
                throw { ok: false, message: "creator not found", status: 404 }
            }
            const products = await this.productRepository.find({ where: { user: user } });//hay que poner el user entero ¿por qué? no sé, pero o si no no funcionara osea queremos buscar el id, pero realmente estamos buscando al user

            if (!products) {
                throw { ok: false, message: "this user has not products", status: 404 }
            }

            return { ok: true, data: products }

        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }
    }

    async getProductUser(ids: { productId: string, userId: string }) {
        const { productId, userId } = ids;
        try {
            const user = await this.userRepository.findOne(userId);
            if (!user) {
                throw { ok: false, message: "creator not found", status: 404 }
            }
            const product = await this.productRepository.findOne({ where: { user: user, id: productId } });
            if (!product) {
                throw { ok: false, message: "product not found", status: 404 }
            }

            return { ok: true, data: product }

        } catch (error) {
            if (error.ok === false) {
                throw new HttpException(error, error.status)
            }
            throw new HttpException(error, 403)
        }


    }

}
