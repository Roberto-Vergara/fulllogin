import { Body, Controller, Get, Param, ParseUUIDPipe, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/user/dto/roles.enum';
import { ProductCreateDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    // solo podra crear productos si el id de los parametros y el id del token coinciden si no lanzara un error 403, solo en el caso de los path product/variablespath
    @Post("/:id")
    @SetMetadata("role", Roles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    createProduct(@Body() productData: ProductCreateDto, @Param("id", ParseUUIDPipe) id: string) {
        return this.productService.createProduct(productData, id)
    }


    // en estos no importa si el id de los parametros es igual al de su token

    @Get(":id")
    @SetMetadata("role", Roles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    getProduct(@Param("id", ParseUUIDPipe) id: string) {
        return this.productService.getProduct(id)
    }

    @Get("/")
    @SetMetadata("role", Roles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    getProducts() {
        return this.productService.getProducts()
    }

}
