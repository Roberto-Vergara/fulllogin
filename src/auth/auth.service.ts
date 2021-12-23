import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from "bcrypt"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }


    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.findUser(email)
            if (!user) {
                return null
            }
            const comPass = await compare(password, user.password);
            if (comPass === true) {
                const { password, email, ...rest } = user;
                // la idea es que retorne el id, role y name
                return rest;
            }
            return null
        } catch (error) {
            return null
        }

    }

    async login(user: { id: string, name: string, role: string }) {
        const payload = { name: user.name, id: user.id, role: user.role }
        const accessToken = this.jwtService.sign(payload);
        return { token: accessToken };
    }
}
