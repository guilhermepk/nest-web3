import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateGuestDto {
    @IsNotEmpty({ message: `'name' não pode estar vazio` })
    @IsString({ message: `'name' deve ser do tipo string` })
    name: string;

    @IsNotEmpty({ message: `'teacherId' não pode estar vazio` })
    @IsNumber(undefined, { message: `'teacherId' deve ser do tipo number` })
    @IsInt({ message: `'teacherId' deve ser um número inteiro` })
    @IsPositive({ message: `'teacherId' deve ser um número positivo` })
    teacherId: number;
}