import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Max } from "class-validator";

export class PaginationDto {
    public static MAX_ITENS_PER_PAGE = 50;

    @IsOptional()
    @IsInt({ message: `'page' deve ser um número inteiro` })
    @IsPositive({ message: `'page' deve ser um número positivo` })
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsInt({ message: `'itemsPerPage' deve ser um número inteiro` })
    @IsPositive({ message: `'itemsPerPage' deve ser um número positivo` })
    @Max(PaginationDto.MAX_ITENS_PER_PAGE, { message: `'itemsPerPage' deve ser no máximo ${PaginationDto.MAX_ITENS_PER_PAGE}` })
    @Type(() => Number)
    itemsPerPage?: number;
}