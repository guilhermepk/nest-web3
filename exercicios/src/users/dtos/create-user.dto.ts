import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: `'name' não pode estar vazio` })
    @IsString({ message: `'name' deve ser do tipo string` })
    name: string;

    @IsNotEmpty({ message: `'password' não pode estar vazio` })
    @IsString({ message: `'password' deve ser do tipo string` })
    password: string;
}