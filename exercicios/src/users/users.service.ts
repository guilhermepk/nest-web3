import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import tryCatch from "src/common/functions/tryCatch";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findById(id: number) {
        return await tryCatch(async () => {
            return await this.prismaService.user.findFirstOrThrow({
                where: {
                    id
                }
            });
        },
            `Não foi possível buscar o usuário com ID ${id}`,
            { notFound: `Nenhum usuário encontrado com o ID ${id}` }
        );
    }

    async findByName(name: string) {
        return await tryCatch(async () => {
            return await this.prismaService.user.findFirstOrThrow({
                where: {
                    name
                }
            });
        },
            `Não foi possível buscar o usuário com nome ${name}`,
            { notFound: `Nenhum usuário encontrado com o nome ${name}` }
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

            const found = await this.prismaService.user.findMany({
                skip,
                take: itemsPerPage,
                orderBy: { id: "asc" }
            });
            if (!found || found.length < 1) throw new NotFoundException(`Nenhum usuário encontrado!`);

            return found;
        },
            `Não foi possível buscar todos os usuários :(`,
            { notFound: `Nenhum usuário encontrado` }
        );
    }

    private async verifyIfNameExists(name: string): Promise<void> {
        await this.findByName(name)
            .then(_ => { throw new ConflictException(`Já existe um usuário com o nome ${name}!`) })
            .catch(error => {
                if (error?.response?.statusCode !== 404) throw error;
            });
    }

    async create(data: CreateUserDto) {
        return await tryCatch(async () => {
            await this.verifyIfNameExists(data.name);

            const created = await this.prismaService.user.create({ data });

            return { message: `Usuário ${created.id} - ${created.name} criado com sucesso!` };
        },
            `Não foi possível criar o usuário`,
        );
    }

    async update(data: UpdateUserDto, id: number) {
        return await tryCatch(async () => {
            if (Object.values(data).length < 1) throw new BadRequestException(`Envie ao menos alguma informação para ser atualizada!`);

            await this.findById(id);

            if (data.name) await this.verifyIfNameExists(data.name);

            const updated = await this.prismaService.user.update({
                where: { id },
                data
            });

            return { message: `Usuário ${updated.id} - ${updated.name} atualizado com sucesso` };
        },
            `Não foi possível atualizar o usuário ${id}`
        );
    }

    async delete(id: number) {
        return await tryCatch(async () => {
            await this.findById(id);

            const deleted = await this.prismaService.user.delete({
                where: {
                    id
                }
            });

            return { message: `Usuário ${deleted.id} - ${deleted.name} excluído com sucesso` }
        },
            `Não foi possível excluir o usuário ${id}`
        );
    }
}