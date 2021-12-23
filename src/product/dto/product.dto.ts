import { IsString, IsNumber } from "class-validator";
export class ProductCreateDto {

    @IsNumber()
    price: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;

}