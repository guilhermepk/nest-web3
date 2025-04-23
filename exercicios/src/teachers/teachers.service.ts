import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherDto } from "./dtos/create-teacher.dto";
import { UpdateTeacherDto } from "./dtos/update-teacher.dto";
import { PrismaService } from "src/prisma/prisma.service";
import tryCatch from "src/common/functions/tryCatch";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Injectable()
export class TeachersService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findById(id: number) {
        return await tryCatch(async () => {
            return await this.prismaService.teacher.findFirstOrThrow({
                where: {
                    id
                },
                include: {
                    guests: true
                }
            });
        },
            `Não foi possível buscar o professor com ID ${id}`,
            { notFound: `Nenhum professor encontrado com o ID ${id}` }
        );
    }

    async findByName(name: string) {
        return await tryCatch(async () => {
            return await this.prismaService.teacher.findFirstOrThrow({
                where: {
                    name
                },
                include: {
                    guests: true
                }
            });
        },
            `Não foi possível buscar o professor com nome ${name}`,
            { notFound: `Nenhum professor encontrado com o nome ${name}` }
        );
    }

    async findAll(paginationOptions?: PaginationDto) {
        return await tryCatch(async () => {
            let { page = 1, itemsPerPage = 10 } = paginationOptions;
            page = parseInt(page as any, 10);
            itemsPerPage = parseInt(itemsPerPage as any, 10);

            const skip = (page - 1) * itemsPerPage;

            const found = await this.prismaService.teacher.findMany({
                skip,
                take: itemsPerPage,
                orderBy: { id: "asc" },
                include: {
                    guests: true
                }
            });
            if (!found || found.length < 1) throw new NotFoundException(`Nenhum professor encontrado!`);

            return found;
        },
            `Não foi possível buscar todos os professores :(`,
            { notFound: `Nenhum professor encontrado` }
        );
    }

    private async verifyIfNameExists(name: string): Promise<void> {
        await this.findByName(name)
            .then(_ => { throw new ConflictException(`Já existe um professor com o nome ${name}!`) })
            .catch(error => {
                if (error?.response?.statusCode !== 404) throw error;
            });
    }

    async create(data: CreateTeacherDto) {
        return await tryCatch(async () => {
            await this.verifyIfNameExists(data.name);

            const created = await this.prismaService.teacher.create({ data });

            return { message: `Professor ${created.id} - ${created.name} criado com sucesso!` };
        },
            `Não foi possível criar o professor`,
        );
    }

    async update(data: UpdateTeacherDto, id: number) {
        return await tryCatch(async () => {
            if (Object.values(data).length < 1) throw new BadRequestException(`Envie ao menos alguma informação para ser atualizada!`);

            await this.findById(id);

            if (data.name) await this.verifyIfNameExists(data.name);

            const updated = await this.prismaService.teacher.update({
                where: { id },
                data
            });

            return { message: `Professor ${updated.id} - ${updated.name} atualizado com sucesso` };
        },
            `Não foi possível atualizar o professor ${id}`
        );
    }

    async delete(id: number) {
        return await tryCatch(async () => {
            await this.findById(id);

            const deleted = await this.prismaService.teacher.delete({
                where: {
                    id
                }
            });

            return { message: `Professor ${deleted.id} - ${deleted.name} excluído com sucesso` }
        },
            `Não foi possível excluir o professor ${id}`
        );
    }
}