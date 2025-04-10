import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateGuestDto } from "./dtos/create-guest.dto";
import { UpdateGuestDto } from "./dtos/update-guest.dto";
import { PrismaService } from "src/prisma/prisma.service";
import tryCatch from "src/common/functions/tryCatch";
import { PaginationDto } from "../common/dtos/pagination.dto";

@Injectable()
export class GuestsService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findById(id: number) {
        return await tryCatch(async () => {
            return await this.prismaService.guest.findFirstOrThrow({
                where: {
                    id
                }
            });
        },
            `Não foi possível buscar o visitante com ID ${id}`,
            { notFound: `Nenhum visitante encontrado com o ID ${id}` }
        );
    }

    async findByName(name: string) {
        return await tryCatch(async () => {
            return await this.prismaService.guest.findFirstOrThrow({
                where: {
                    name
                }
            });
        },
            `Não foi possível buscar o visitante com nome ${name}`,
            { notFound: `Nenhum visitante encontrado com o nome ${name}` }
        );
    }

    async findAll(paginationOptions?: PaginationDto) {
        return await tryCatch(async () => {
            let { page = 1, itemsPerPage = 10 } = paginationOptions;
            page = parseInt(page as any, 10);
            itemsPerPage = parseInt(itemsPerPage as any, 10);

            const skip = (page - 1) * itemsPerPage;

            console.log({
                skip,
                take: itemsPerPage,
                orderBy: { id: "asc" }
            })

            const found = await this.prismaService.guest.findMany({
                skip,
                take: itemsPerPage,
                orderBy: { id: "asc" }
            });
            if (!found || found.length < 1) throw new NotFoundException(`Nenhum visitante encontrado!`);

            return found;
        },
            `Não foi possível buscar todos os visitantes :(`,
            { notFound: `Nenhum visitante encontrado` }
        );
    }

    private async verifyIfNameExists(name: string): Promise<void> {
        await this.findByName(name)
            .then(_ => { throw new ConflictException(`Já existe um visitante com o nome ${name}!`) })
            .catch(error => {
                if (error?.response?.statusCode !== 404) throw error;
            });
    }

    async create(data: CreateGuestDto) {
        return await tryCatch(async () => {
            await this.verifyIfNameExists(data.name);

            const created = await this.prismaService.guest.create({ data });

            return { message: `Visitante ${created.id} - ${created.name} criado com sucesso!` };
        },
            `Não foi possível criar o visitante`,
        );
    }

    async update(data: UpdateGuestDto, id: number) {
        return await tryCatch(async () => {
            if (Object.values(data).length < 1) throw new BadRequestException(`Envie ao menos alguma informação para ser atualizada!`);

            await this.findById(id);

            if (data.name) await this.verifyIfNameExists(data.name);

            const updated = await this.prismaService.guest.update({
                where: { id },
                data
            });

            return { message: `Visitante ${updated.id} - ${updated.name} atualizado com sucesso` };
        },
            `Não foi possível atualizar o visitante ${id}`
        );
    }

    async delete(id: number) {
        return await tryCatch(async () => {
            await this.findById(id);

            const deleted = await this.prismaService.guest.delete({
                where: {
                    id
                }
            });

            return { message: `Visitante ${deleted.id} - ${deleted.name} excluído com sucesso` }
        },
            `Não foi possível excluir o visitante ${id}`
        );
    }
}