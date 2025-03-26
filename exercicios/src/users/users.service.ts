import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UsersService {
    findById(id: number){
        return { id, name: `User ${id}` }
    }

    findAll(){
        const list = [];

        for(let x = 0; x < 50; x++){
            list.push({ id: x+1, name: `User ${x+1}` })
        }

        return list;
    }

    create(data: CreateUserDto){
        return { message: 'Criado com sucesso!' }
    }

    update(data: UpdateUserDto, id: number){
        return { message: `User ${id} atualizado com sucesso!` }
    }

    delete(id: number){
        return { message: `User ${id} excluído com sucesso!` }
    }
}