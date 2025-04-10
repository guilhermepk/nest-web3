import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
    @IsNotEmpty({ message: `'name' não pode estar vazio` })
    @IsString({ message: `'name' deve ser do tipo string` })
    name: string;

    @IsNotEmpty({ message: `'subject' não pode estar vazio` })
    @IsString({ message: `'subject' deve ser do tipo string` })
    subject: string;
}