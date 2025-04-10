import { IsNotEmpty, IsString } from "class-validator";

export class CreateGuestDto {
    @IsNotEmpty({ message: `'name' não pode estar vazio` })
    @IsString({ message: `'name' deve ser do tipo string` })
    name: string;
}