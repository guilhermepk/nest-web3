import { Injectable } from "@nestjs/common";

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
}