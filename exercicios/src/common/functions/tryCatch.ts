import { HttpException, InternalServerErrorException } from "@nestjs/common";
import handlePrismaError, { PrismaErrorHandlingMessages } from "./handlePrismaError";

function handleError(error: any, unexpectedErrorMessage: string, prismaMessages?: PrismaErrorHandlingMessages) {
    throw error instanceof HttpException
        ? error
        : (
            error.code
                ? handlePrismaError(error.code, prismaMessages)
                : new InternalServerErrorException(`Erro inesperado: ${unexpectedErrorMessage}. ${error}`)
        );
}

export default async function tryCatch<T>(
    callback: () => T | Promise<T>,
    unexpectedErrorMessage: string,
    prismaMessages?: PrismaErrorHandlingMessages
): Promise<T> {
    try {
        return await callback();
    } catch (error) {
        handleError(error, unexpectedErrorMessage, prismaMessages);
    }
}