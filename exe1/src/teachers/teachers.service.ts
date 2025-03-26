import { Injectable } from "@nestjs/common";

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
}