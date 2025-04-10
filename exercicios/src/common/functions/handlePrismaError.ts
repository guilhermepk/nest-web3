import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

export interface PrismaErrorHandlingMessages {
    notFound?: string
}

export default function handlePrismaError(code: string, messages?: PrismaErrorHandlingMessages) {
    switch (code) {
        case 'P2025':
            return new NotFoundException(messages.notFound ?? `Não encontrado!`);
        default:
            throw new InternalServerErrorException(`Erro não registrado do prisma: ${code}`);
    }
}