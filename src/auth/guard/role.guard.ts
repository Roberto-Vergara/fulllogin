import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "src/user/dto/roles.enum";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector, private readonly userService: UserService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const role = this.reflector.get("role", context.getHandler())
        if (!role) {
            return true
            // devolvemos true porque si no hay rol significa que recien se esta creando una cuenta(no es ni admin ni user)
        }

        const [req] = context.getArgs();
        // tambien se puede conseguir los datos de peticion con switchToHttp()
        const method = req.method;

        const { user } = req;//user es el token resuelto
        const originalPath = req.route.path.split("/")[1];

        if (method === "POST" && originalPath === "product") {
            //este es el unico path que importa que el id params sea igual al id del token
            if (user.id !== req.params.id) {
                // console.log("el id del token y del id de los params son diferentes");

                return false
            }

            // retornamos true por que si llega aqui sabemos que es un usario buscando a otro
            return true

        }


        if (role === Roles.ADMIN) {//esto es en caso de que el metadato sea admin
            if (user.role === Roles.ADMIN) {//si el controller tiene metadata de admin y el la peticion tiene en el token role admin lanzara true
                return true
            }
            //si no lanzara false
            return false
        }

        // si llega aqui es porque el role del metadata es User y puede pasar nomas
        return true


    }
}