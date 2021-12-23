import { IsString, isEmail } from "class-validator"

export class UserCreateDto {

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    city: string;

    @IsString()
    role: string;

}