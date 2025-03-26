import { Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dtos/create-teacher.dto";
import { UpdateTeacherDto } from "./dtos/update-teacher.dto";

@Injectable()
export class TeachersService {
    findById(id: number){
        return { id, name: `Teacher ${id}` }
    }

    findAll(){
        const list = [];

        for(let x = 0; x < 50; x++){
            list.push({ id: x+1, name: `Teacher ${x+1}` })
        }

        return list;
    }

    create(data: CreateTeacherDto){
        return { message: 'Criado com sucesso!' }
    }

    update(data: UpdateTeacherDto, id: number){
        return { message: `Teacher ${id} atualizado com sucesso!` }
    }

    delete(id: number){
        return { message: `Teacher ${id} excluído com sucesso!` }
    }
}