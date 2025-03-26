import { Injectable } from "@nestjs/common";

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
}