import { Injectable } from "@nestjs/common";
import { CreateGuestDto } from "./dtos/create-guest.dto";
import { UpdateGuestDto } from "./dtos/update-guest.dto";

@Injectable()
export class GuestsService {
    findById(id: number){
        return { id, name: `Guest ${id}` }
    }

    findAll(){
        const list = [];

        for(let x = 0; x < 50; x++){
            list.push({ id: x+1, name: `Guest ${x+1}` })
        }

        return list;
    }

    create(data: CreateGuestDto){
        return { message: 'Criado com sucesso!' }
    }

    update(data: UpdateGuestDto, id: number){
        return { message: `Guest ${id} atualizado com sucesso!` }
    }

    delete(id: number){
        return { message: `Guest ${id} excluído com sucesso!` }
    }
}