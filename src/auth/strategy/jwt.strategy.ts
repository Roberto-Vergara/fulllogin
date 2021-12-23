import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("ACCESS_TOKEN")
        })
    }


    validate(payload) {
        // devuelve los datos ya resueltos validados, osea que enves de pasar token pasa los datos resueltos y no llegara aqui si esque el token es invalido
        return payload;
    }
}