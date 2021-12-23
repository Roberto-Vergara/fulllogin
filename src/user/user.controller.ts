import { Body, Controller, Get, Param, ParseUUIDPipe, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from './dto/roles.enum';
import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post("/")
    createUser(@Body() userData: UserCreateDto) {
        return this.userService.createUser(userData)
    }

    @Get(":id")
    @SetMetadata("role", Roles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    getUser(@Param("id", ParseUUIDPipe) id: string) {
        //este no devuelve datos sensibles
        return this.userService.getUser(id)
    }

    @Get("/")//aqui va depender de que role tenga el user
    @SetMetadata("role", Roles.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)//va a recibir el token en los headers
    getUsers() {
        // devuelve datos sensibles, pero solo los admins deberian poder usar esta ruta
        return this.userService.getUsers()
    }


    // aqui no es necesario que coincida el id de los parametros con el del token, por que no se podria buscar usuarios por id(que se deberia poder hacer) si tu eres un usuario diferente
    //osea que solo podrias buscarte a ti mismo nomas y eso no sirve
    @Get(":id/product")
    @SetMetadata("role", Roles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    getProductsUser(@Param("id", ParseUUIDPipe) id: string) {
        return this.userService.getProductsUser(id)
    }

    @Get(":userId/product/:productId")
    @SetMetadata("role", Roles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    getProductUser(@Param() ids) {
        return this.userService.getProductUser(ids)
    }

    // los del path user no necesitan verificar si el id de los parametros es igual al del token(como en los del path product) y estos dos ultimos controllers no son excepcion
    // ver role.guard.ts para ver toda la logica de verificacion de roles, que aprovecha a verificar id(si el path es product) con sus demas cosas o si el path es user que verifica
    //  si el role que tiene el usuario coincide con el que debe cumplir por metadata(esto tambien se hace en los de path product)

}
