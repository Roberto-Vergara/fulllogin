import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/guard/local-auth.guard";


// si usamos mysql dockerizado es necesario correrlo con las variables de entorno correspondientes, si dockerizamos esta app hay que estar atento al host ya que toma el host bridge

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {

    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)// este es el controller principal, conjunto el de crear user porque este te devuelve tu token unico que lleva tus datos
    login(@Request() req) {
        return this.authService.login(req.user)
    }


}